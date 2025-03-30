import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

class TestAdminPage(unittest.TestCase):
    def setUp(self):
        # Set up the WebDriver before each test
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        self.wait = WebDriverWait(self.driver, 10)

    def test_admin_login(self):
        # Step 1: Navigate to the signin page
        self.driver.get("http://localhost:5173/signin")
        
        # Step 2: Locate login form elements
        username_field = self.driver.find_element(By.NAME, "username")
        password_field = self.driver.find_element(By.NAME, "password")
        login_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")

        # Step 3: Enter credentials
        username_field.send_keys("admin")
        password_field.send_keys("admin")

        # Step 4: Submit the login form
        login_button.click()

        # Step 5: Wait for the admin page to load
        self.wait.until(
            EC.url_to_be("http://localhost:5173/admin")
        )

        # Step 6: Verify the admin page loaded
        welcome_text = self.driver.find_element(By.XPATH, "//h4[contains(text(), 'Welcome to Admin Dashboard')]")
        self.assertIn("Welcome to Admin Dashboard", welcome_text.text, "Admin dashboard heading not found!")

        # Optional: Verify "Total Customers" card is present
        total_customers = self.driver.find_element(By.XPATH, "//h6[contains(text(), 'Total Customers')]")
        self.assertTrue(total_customers.is_displayed(), "Total Customers card not displayed!")

        print("Admin page test passed successfully!")

    def tearDown(self):
        # Close the browser after each test
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()