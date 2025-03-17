from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options

# Configure Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--window-size=1920,1080")

# Initialize WebDriver with headless Chrome
driver = webdriver.Chrome(options=chrome_options)

# Open FindService Page
driver.get("http://localhost:5173/findService")

# Explicit wait
wait = WebDriverWait(driver, 15)

def test_page_load():
    try:
        assert "FindService" in driver.title or driver.current_url.endswith("/findService"), \
            "❌ Page did not load correctly!"
        print("✅ Page loaded successfully!")
    except AssertionError as e:
        print(e)

def test_worker_profiles():
    try:
        profiles = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "profile-card")))
        assert len(profiles) > 0, "❌ No worker profiles found!"
        print(f"✅ Found {len(profiles)} worker profiles!")
    except TimeoutException:
        print("❌ Worker profiles did not load!")

try:
    test_page_load()
    test_worker_profiles()
finally:
    driver.quit()
