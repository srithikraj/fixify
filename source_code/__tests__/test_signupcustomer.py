from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import unittest

class TestSignupPage(unittest.TestCase):

    def setUp(self):
        # Set up the WebDriver using webdriver-manager for automatic chromedriver management
        service = Service(ChromeDriverManager().install())  # Use Service to pass the chromedriver path
        self.driver = webdriver.Chrome(service=service)
        self.driver.get('http://localhost:5173/create-account')
        self.driver.maximize_window()

    def test_signup_form_submission(self):
        driver = self.driver

        # Fill out the form fields
        driver.find_element(By.NAME, "first_name").send_keys("John")
        driver.find_element(By.NAME, "last_name").send_keys("Doe")
        driver.find_element(By.NAME, "email").send_keys("john.doe@example.com")
        driver.find_element(By.NAME, "password").send_keys("password123")
        driver.find_element(By.NAME, "phone").send_keys("1234567890")
        driver.find_element(By.NAME, "line1").send_keys("123 Main St")
        driver.find_element(By.NAME, "postal_code").send_keys("A1A 1A1")
        
        # Select a province
        province_dropdown = driver.find_element(By.NAME, "province")
        province_dropdown.click()
        province_dropdown.find_element(By.XPATH, "//option[text()='Ontario']").click()

        # Submit the form
        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()


    def test_form_validation_errors(self):
        driver = self.driver

        # Submit the form with empty fields
        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        # Check for error messages
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//span[text()='First Name is required']"))
        )
        self.assertTrue(driver.find_element(By.XPATH, "//span[text()='First Name is required']").is_displayed())
        self.assertTrue(driver.find_element(By.XPATH, "//span[text()='Last Name is required']").is_displayed())
        self.assertTrue(driver.find_element(By.XPATH, "//span[text()='Invalid email format']").is_displayed())
        self.assertTrue(driver.find_element(By.XPATH, "//span[text()='Password is required']").is_displayed())

    def test_phone_number_format(self):
        driver = self.driver

        # Test invalid phone number
        driver.find_element(By.NAME, "phone").send_keys("12345")  # Invalid phone number
        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//span[text()='Phone must be 10 digits (e.g., 1234567890)']"))
        )
        self.assertTrue(driver.find_element(By.XPATH, "//span[text()='Phone must be 10 digits (e.g., 1234567890)']").is_displayed())

    def tearDown(self):
        # Close the browser after tests
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()