import unittest
from selenium import webdriver
<<<<<<< HEAD
=======
from selenium.webdriver.common.keys import Keys
>>>>>>> 042a355 (forgot to add .yml file edits for frontend testing)
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager

class LoginPageTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Set up WebDriver before tests (runs once for all tests)"""
        chrome_options = Options()
<<<<<<< HEAD
        chrome_options.add_argument("--headless")  # Run tests in headless mode
=======
        # chrome_options.add_argument("--headless")  # Run tests in headless mode
>>>>>>> 042a355 (forgot to add .yml file edits for frontend testing)
        chrome_options.add_argument("--window-size=1920,1080")  # Simulate real screen size
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        try:
            service = Service(ChromeDriverManager().install())
            cls.driver = webdriver.Chrome(service=service, options=chrome_options)
            cls.driver.get("https://fixifyawsamplify-production-7a03.up.railway.app/signin")  # Ensure your local server is running
            cls.wait = WebDriverWait(cls.driver, 10)  # Increased wait time for elements
        except WebDriverException as e:
            print("Error setting up WebDriver:", str(e))
            raise
<<<<<<< HEAD

=======
    def setUp(self):
        """Reset state before each test by reloading the login page."""
        self.driver.get("http://localhost:5173/signin")
        
>>>>>>> 042a355 (forgot to add .yml file edits for frontend testing)
    @classmethod
    def tearDownClass(cls):
        """Close browser after all tests"""
        if cls.driver:
            cls.driver.quit()

    def check_element(self, by, value, error_message):
        """Reusable method to check if an element is present and displayed"""
        try:
            element = self.wait.until(EC.presence_of_element_located((by, value)))
            self.assertTrue(element.is_displayed(), error_message)
        except TimeoutException:
            self.fail(error_message)

    def test_username_input_render(self):
        """Test if the username input field is rendered"""
        self.check_element(By.NAME, 'username', "Username input field is missing or took too long to load")

    def test_password_input_render(self):
        """Test if the password input field is rendered"""
        self.check_element(By.NAME, 'password', "Password input field is missing or took too long to load")

    def test_login_button_render(self):
        """Test if the login button is rendered"""
        self.check_element(By.XPATH, "//button[@type='submit']", "Login button is missing or took too long to load")
<<<<<<< HEAD
=======
        
    def test_successful_login(self):
        """Test that a valid login results in a successful state by verifying URL change to /admin."""
        # Clear and fill the username field
        username_field = self.wait.until(EC.presence_of_element_located((By.NAME, "username")))
        username_field.send_keys(Keys.CONTROL + "a")
        username_field.send_keys(Keys.DELETE)
        username_field.send_keys("admin")

        # Clear and fill the password field
        password_field = self.wait.until(EC.presence_of_element_located((By.NAME, "password")))
        password_field.send_keys(Keys.CONTROL + "a")
        password_field.send_keys(Keys.DELETE)
        password_field.send_keys("admin")

        # Click the login button
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        try:
            # Wait for the URL to change to include "/admin"
            self.wait.until(EC.url_contains("/admin"))
            current_url = self.driver.current_url
            self.assertIn("/admin", current_url, "User was not redirected to the /admin page")
        except TimeoutException:
            self.fail("User was not redirected to the /admin page after login")


>>>>>>> 042a355 (forgot to add .yml file edits for frontend testing)

    def test_error_message_render(self):
        """Test if the error message is displayed when incorrect login is attempted"""
        # Simulating an incorrect login by entering invalid credentials
        self.driver.find_element(By.NAME, "username").send_keys("invalidUser")
        self.driver.find_element(By.NAME, "password").send_keys("wrongPassword")
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        try:
            # Waiting for the error message to appear
<<<<<<< HEAD
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//p[contains(text(),'Login failed')]")))
            error_message = self.driver.find_element(By.XPATH, "//p[contains(text(),'Login failed')]").text
            self.assertTrue("Login failed" in error_message, "Error message not displayed as expected")
=======
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//p[contains(text(),'Login Failed! User not found!')]")))
            error_message = self.driver.find_element(By.XPATH, "//p[contains(text(),'Login Failed! User not found!')]").text
            self.assertTrue("Login Failed! User not found!" in error_message, "Error message not displayed as expected")
>>>>>>> 042a355 (forgot to add .yml file edits for frontend testing)
        except TimeoutException:
            self.fail("Error message did not appear after failed login attempt")

if __name__ == "__main__":
    unittest.main()