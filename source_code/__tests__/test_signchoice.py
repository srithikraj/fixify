import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class SignupChoicePageTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:5173/signup-choice")
        self.driver.implicitly_wait(10)

    def tearDown(self):
        self.driver.quit()

    def test_components_displayed(self):
        """Test if all necessary components are displayed on the SignupChoice page."""
        wait = WebDriverWait(self.driver, 10)

        # Title
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.XPATH, "//h4[contains(text(), 'Join Our Community')]"))).is_displayed())

        # Subtitle
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.XPATH, "//p[contains(text(), 'Choose how you')]"))).is_displayed())

        # Customer Card
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.ID, "customercard"))).is_displayed())

        # Worker Card
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.ID, "workercard"))).is_displayed())

        # Continue Button
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.ID, "continuebutton"))).is_displayed())

        # Login Link
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.XPATH, "//span[contains(text(), 'Log in here')]"))).is_displayed())

        # Back button
        self.assertTrue(wait.until(EC.visibility_of_element_located((By.ID, "iconbutton"))).is_displayed())

    def test_customer_card_selection_and_navigation(self):
        """Test selecting the customer card and navigating to the create-account page."""
        wait = WebDriverWait(self.driver, 10)
        customer_card = wait.until(EC.element_to_be_clickable((By.ID, "customercard")))
        customer_card.click()

        continue_button = wait.until(EC.element_to_be_clickable((By.ID, "continuebutton")))
        continue_button.click()

        self.assertTrue("/create-account" in self.driver.current_url)

    def test_worker_card_selection_and_navigation(self):
        """Test selecting the worker card and navigating to the service-provider page."""
        wait = WebDriverWait(self.driver, 10)
        worker_card = wait.until(EC.element_to_be_clickable((By.ID, "workercard")))
        worker_card.click()

        continue_button = wait.until(EC.element_to_be_clickable((By.ID, "continuebutton")))
        continue_button.click()

        self.assertTrue("/service-provider" in self.driver.current_url)

    def test_login_link_navigation(self):
        """Test clicking the login link and navigating to the signin page."""
        wait = WebDriverWait(self.driver, 10)
        login_link = wait.until(EC.element_to_be_clickable((By.XPATH, "//span[contains(text(), 'Log in here')]")))
        login_link.click()

        self.assertTrue("/signin" in self.driver.current_url)

    def test_go_back_button_navigation(self):
        """Test clicking the go back button and navigating to the home page."""
        wait = WebDriverWait(self.driver, 10)
        go_back_button = wait.until(EC.element_to_be_clickable((By.ID, "iconbutton")))
        self.driver.execute_script("arguments[0].click();", go_back_button)

        self.assertEqual(self.driver.current_url, "http://localhost:5173/")

if __name__ == "__main__":
    unittest.main()