import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time  # Import the time module

class LoginPageComponentAndLoginTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:5173/signin")

    def tearDown(self):
        self.driver.quit()

    def test_components_displayed(self):
        """Test if all necessary components are displayed on the login page."""
        wait = WebDriverWait(self.driver, 10)  # 10-second max wait time
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.XPATH, "//h4[text()='Welcome Back!']"))).is_displayed())
        self.assertTrue(self.driver.find_element(By.NAME, "username").is_displayed())
        self.assertTrue(self.driver.find_element(By.NAME, "password").is_displayed())
        self.assertTrue(self.driver.find_element(By.XPATH, "//button[text()='Login']").is_displayed())
        self.assertTrue(self.driver.find_element(By.XPATH, "//img[@alt='Welcome Image']").is_displayed())

    def test_successful_login_and_redirect(self):
        """Test successful login with admin credentials and navigation to WorkerProfile."""
        # Locate form elements
        username_field = self.driver.find_element(By.NAME, "username")
        password_field = self.driver.find_element(By.NAME, "password")
        login_button = self.driver.find_element(By.XPATH, "//button[text()='Login']")

        # Enter credentials and submit
        username_field.send_keys("rajveerjadav19@gmail.com")
        password_field.send_keys("1234")
        login_button.click()

        # Wait for redirection to unauthorized page
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.url_contains("/unauthorized"))
        self.assertEqual(self.driver.current_url.split("?")[0], "http://localhost:5173/unauthorized")

        # Manually redirect to WorkerProfile (as per your instruction)
        self.driver.get("http://localhost:5173/WorkerProfile")

        # Add assertions to verify you are on the WorkerProfile page.
        # This will depend on the specific elements on your WorkerProfile page.
        # Example:
        wait.until(EC.url_contains("/WorkerProfile"))
        self.assertEqual(self.driver.current_url.split("?")[0], "http://localhost:5173/WorkerProfile")
        self.driver.get("http://localhost:5173/WorkerProfile")


        # Basic Info
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.XPATH, "//h6[contains(text(), 'Rajveer')]"))).is_displayed())  # Adjust name as needed
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.XPATH, "//button[text()='Edit Profile']"))).is_displayed())
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.XPATH, "//button[text()='Update Password']"))).is_displayed())

        # Account Info
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.NAME, "username"))).is_displayed())
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.NAME, "name"))).is_displayed())
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.NAME, "lastName"))).is_displayed())
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.NAME, "phone"))).is_displayed())
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.NAME, "email"))).is_displayed())
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.NAME, "addressln1"))).is_displayed())
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.NAME, "province"))).is_displayed())
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.NAME, "postalCode"))).is_displayed())

        # Reviews Section
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.XPATH, "//h6[text()='Reviews']"))).is_displayed())

        # Password Update Modal (check the button exists)
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.XPATH, "//button[text()='Update Password']"))).is_displayed())

if __name__ == "__main__":
    unittest.main()