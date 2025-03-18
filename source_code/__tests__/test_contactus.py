import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager

class ContactUsPageTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Set up WebDriver before tests (runs once for all tests)"""
        chrome_options = Options()

        chrome_options.add_argument("--headless")  # Run tests in headless mode

        chrome_options.add_argument("--window-size=1920,1080")  # Simulate real screen size
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        try:
            service = Service(ChromeDriverManager().install())
            cls.driver = webdriver.Chrome(service=service, options=chrome_options)
            cls.driver.get("https://fixifyawsamplify-production-7a03.up.railway.app/contactus")  # Ensure your local server is running

            cls.wait = WebDriverWait(cls.driver, 10)  # Increased wait time for elements
        except WebDriverException as e:
            print("Error setting up WebDriver:", str(e))
            raise

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

    def test_contact_form_render(self):
        """Test if the contact form and all its fields are rendered"""
        # Check the fields are present and visible
        self.check_element(By.NAME, 'fullName', "Full Name field is missing or took too long to load")
        self.check_element(By.NAME, 'email', "Email field is missing or took too long to load")
        self.check_element(By.NAME, 'phone', "Phone field is missing or took too long to load")
        self.check_element(By.NAME, 'location', "Location field is missing or took too long to load")
        self.check_element(By.NAME, 'message', "Message field is missing or took too long to load")

        # Check the submit button
        self.check_element(By.XPATH, "//button[@type='submit']", "Submit button is missing or took too long to load")

    def test_form_submission(self):
        """Test if the form can be submitted (mock success)"""
        # Fill out the form
        self.driver.find_element(By.NAME, "fullName").send_keys("John Doe")
        self.driver.find_element(By.NAME, "email").send_keys("johndoe@example.com")
        self.driver.find_element(By.NAME, "phone").send_keys("+1 (123) 456-7890")
        self.driver.find_element(By.NAME, "location").send_keys("New York")
        self.driver.find_element(By.NAME, "message").send_keys("I need help with the product.")

        # Submit the form
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        # Wait for the success message (this can be a confirmation that the email was sent)
        try:
            self.wait.until(EC.alert_is_present())  # Waiting for an alert to appear after form submission
            alert = self.driver.switch_to.alert
            alert_text = alert.text
            self.assertTrue("Email sent successfully" in alert_text, "Submission failed or alert text mismatch")
            alert.accept()
        except TimeoutException:
            self.fail("Form submission did not trigger the expected success alert")

    def test_contact_information_display(self):
        """Test if the contact information (phone and address) are displayed correctly"""
        # Check if phone number and address are displayed
        self.check_element(By.XPATH, "//p[contains(text(), 'Phone: +1 (123) 456-7890')]", "Phone number is missing or took too long to load")
        self.check_element(By.XPATH, "//p[contains(text(), 'Address: 123 Business St')]", "Address is missing or took too long to load")

if __name__ == "__main__":
    unittest.main()