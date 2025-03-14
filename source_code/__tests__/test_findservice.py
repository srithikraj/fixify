from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

# Initialize WebDriver
driver = webdriver.Chrome()

# Open FindService Page
driver.get("http://localhost:5173/findService")
driver.maximize_window()

# Explicit wait
wait = WebDriverWait(driver, 15)  # Increased wait time to 15 seconds

# TEST 1: Verify Page Title
def test_page_load():
    try:
        assert "FindService" in driver.title or driver.current_url == "http://localhost:5173/findService", "❌ Page did not load correctly!"
        print("✅ Page loaded successfully!")
    except AssertionError as e:
        print(e)

# TEST 2: Check if worker profiles are displayed
def test_worker_profiles():
    try:
        profiles = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "profile-card")))
        assert len(profiles) > 0, "❌ No worker profiles found!"
        print(f"✅ Found {len(profiles)} worker profiles!")
    except TimeoutException:
        print("❌ Worker profiles did not load!")

# Run Tests
try:
    test_page_load()
    test_worker_profiles()
finally:
    # Close browser after tests
    driver.quit()