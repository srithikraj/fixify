from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest

class TestSignupChoicePage(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Initialize the WebDriver (it will automatically look for the driver in your PATH)
        cls.driver = webdriver.Chrome()
        cls.driver.get("http://localhost:5173/signup-choice")  # Your local URL

    def test_title(self):
        # Check if the page title contains 'Join Our Community'
        self.assertIn("Join Our Community", self.driver.title)

    def test_customer_card(self):
        # Find the 'Customer' card and verify it's displayed
        customer_card = self.driver.find_element(By.ID, "customercard")
        self.assertTrue(customer_card.is_displayed())

        # Click the 'Customer' card
        customer_card.click()

        # Verify that the card border is now highlighted (if applicable)
        selected_border = self.driver.find_element(By.XPATH, "//div[@id='customercard' and contains(@style, 'border: 2px solid rgb(25, 118, 210);')]")
        self.assertIsNotNone(selected_border)

    def test_worker_card(self):
        # Find the 'Worker' card and verify it's displayed
        worker_card = self.driver.find_element(By.ID, "workercard")
        self.assertTrue(worker_card.is_displayed())

        # Click the 'Worker' card
        worker_card.click()

        # Verify that the card border is now highlighted (if applicable)
        selected_border = self.driver.find_element(By.XPATH, "//div[@id='workercard' and contains(@style, 'border: 2px solid rgb(233, 30, 99);')]")
        self.assertIsNotNone(selected_border)

    def test_continue_button_disabled(self):
        # Find the 'Continue' button
        continue_button = self.driver.find_element(By.ID, "continuebutton")
        self.assertFalse(continue_button.is_enabled())  # Button should be disabled initially

    def test_continue_button_enabled_after_selection(self):
        # Select the 'Customer' card to enable the button
        customer_card = self.driver.find_element(By.ID, "customercard")
        customer_card.click()

        # Wait for the 'Continue' button to be enabled
        WebDriverWait(self.driver, 5).until(EC.element_to_be_clickable((By.ID, "continuebutton")))

        # Verify the 'Continue' button is now enabled
        continue_button = self.driver.find_element(By.ID, "continuebutton")
        self.assertTrue(continue_button.is_enabled())

    def test_navigation_after_continue(self):
        # Select 'Customer' card and click 'Continue'
        customer_card = self.driver.find_element(By.ID, "customercard")
        customer_card.click()
        continue_button = self.driver.find_element(By.ID, "continuebutton")
        continue_button.click()

        # Wait for navigation to /create-account
        WebDriverWait(self.driver, 5).until(EC.url_to_be("http://localhost:5173/create-account"))

        # Verify that it navigates to '/create-account'
        self.assertEqual(self.driver.current_url, "http://localhost:5173/create-account")

        # Navigate back to the SignupChoice page
        self.driver.get("http://localhost:5173/signup-choice")  # Reload the page

        # Select 'Worker' card and click 'Continue'
        worker_card = self.driver.find_element(By.ID, "workercard")
        worker_card.click()
        continue_button.click()

        # Wait for navigation to /service-provider
        WebDriverWait(self.driver, 5).until(EC.url_to_be("http://localhost:5173/service-provider"))

        # Verify that it navigates to '/service-provider'
        self.assertEqual(self.driver.current_url, "http://localhost:5173/service-provider")

    def test_login_link(self):
        # Verify the 'Log in here' link is working
        login_link = self.driver.find_element(By.XPATH, "//span[contains(text(), 'Log in here')]")
        login_link.click()

        # Wait for the login page to load
        WebDriverWait(self.driver, 5).until(EC.url_to_be("http://localhost:5173/signin"))

        # Verify that it navigates to the login page
        self.assertEqual(self.driver.current_url, "http://localhost:5173/signin")

    @classmethod
    def tearDownClass(cls):
        # Close the browser after the tests
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()