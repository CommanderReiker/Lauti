from playwright.sync_api import sync_playwright
from pathlib import Path
import os
ARTIFACTS = Path(os.environ.get("LAUTI_ARTIFACTS", "/tmp/lauti-artifacts"))
ARTIFACTS.mkdir(parents=True, exist_ok=True)
BASE_URL = os.environ.get("LAUTI_TEST_URL", "http://127.0.0.1:8080")
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1400},device_scale_factor=1)
    errors=[]
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto(BASE_URL,wait_until='networkidle')
    assert page.locator('.puzzle').count()==4
    assert page.locator('.letter-box').count()==21
    assert page.locator('.vowel').count()==8
    old=page.locator('.picture').first.get_attribute('aria-label')
    page.locator('.picture').first.click()
    assert old != page.locator('.picture').first.get_attribute('aria-label')
    page.locator('#solution').check()
    assert page.locator('.letter-box').first.inner_text()=='F'
    assert page.locator('.letter-box').nth(1).inner_text()=='e'
    page.locator('#uppercase').check()
    assert page.locator('.letter-box').nth(1).inner_text()=='E'
    page.locator('#solution').uncheck()
    page.locator('#words').fill('Straße')
    page.locator('button[type=submit]').click()
    assert page.locator('#error').is_visible()
    assert page.locator('.puzzle').count()==4
    page.locator('#words').fill('Fenster\nSonne\nTiger\nMaus')
    page.locator('button[type=submit]').click()
    assert page.locator('#error').is_hidden()
    page.screenshot(path=str(ARTIFACTS / 'lauti-desktop.png'), full_page=True)
    page.pdf(path=str(ARTIFACTS / 'lauti-lernblatt.pdf'),format='A4',prefer_css_page_size=True,print_background=True)
    page.emulate_media(media='print')
    assert page.locator('.picture-name').first.is_hidden()
    assert page.locator('.controls').is_hidden()
    assert page.locator('.vowel').first.evaluate('(e)=>getComputedStyle(e).backgroundColor')=='rgb(255, 240, 160)'
    page.emulate_media(media='screen')
    page.set_viewport_size({'width':390,'height':844})
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    page.screenshot(path=str(ARTIFACTS / 'lauti-mobile.png'),full_page=True)
    page.locator('#words').fill('Überraschung\nÜberraschung\nÜberraschung\nÜberraschung')
    page.locator('button[type=submit]').click()
    page.emulate_media(media='print')
    page.pdf(path=str(ARTIFACTS / 'lauti-long.pdf'),format='A4',prefer_css_page_size=True,print_background=True)
    assert not errors, errors
    print('Browser: generation, image swap, solutions, uppercase, validation, mobile width and print styling passed.')
    browser.close()
try:
    import fitz
    for path in [ARTIFACTS / 'lauti-lernblatt.pdf', ARTIFACTS / 'lauti-long.pdf']:
        doc=fitz.open(path)
        assert len(doc)==1, f'{path}: {len(doc)} pages'
        text=doc[0].get_text()
        assert 'Du schaffst das!' in text
        print(f'{path.name}: one A4 page, footer present')
except ImportError:
    print('PDF page count not checked: fitz unavailable')
