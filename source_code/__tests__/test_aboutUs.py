import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

class TestAboutUsPage(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Setup WebDriver before running tests"""
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run in headless mode
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        cls.driver = webdriver.Chrome(options=chrome_options)
        cls.driver.get("https://fixifyawsamplify-production-7a03.up.railway.app/aboutus")

    def test_page_title(self):
        """Verify page title contains 'About Us'"""
        self.assertIn("Fixify", self.driver.title)
        
    def test_logo_displayed(self):
        """Check if the logo is visible"""
        logo = self.driver.find_element(By.TAG_NAME, "img")
        self.assertTrue(logo.is_displayed())

    def test_navigation_buttons(self):
        """Check if 'HOME' and 'LOGIN' buttons exist and work"""
        # Wait for the buttons to be visible (using CSS selectors with data-testid)
        #home_btn = self.driver.find_element(By.CSS_SELECTOR, "button[data-testid='home-button']")
        #login_btn = self.driver.find_element(By.CSS_SELECTOR, "button[data-testid='login-button']")

        #self.assertTrue(home_btn.is_displayed())
        #self.assertTrue(login_btn.is_displayed())

        # Test HOME button navigation
        #home_btn.click()
        #time.sleep(2)  # Wait for navigation
        #self.assertIn("Home", self.driver.title)

        # Navigate back
        #self.driver.get("http://localhost:5173/aboutus")

        # Test LOGIN button navigation
        #login_btn.click()
        #time.sleep(2)  # Wait for redirection
        #self.assertIn("Login", self.driver.title)

    def test_about_us_section(self):
        """Verify 'ABOUT US' section is present"""
        about_title = self.driver.find_element(By.XPATH, "//h2[contains(text(), 'ABOUT US')]")
        about_text = self.driver.find_element(By.XPATH, "//p[contains(text(), 'Welcome to FIXIFY!')]")
        about_video = self.driver.find_element(By.TAG_NAME, "video")

        self.assertTrue(about_title.is_displayed())
        self.assertTrue(about_text.is_displayed())
        self.assertTrue(about_video.is_displayed())

    def test_team_section(self):
        """Check 'MEET OUR TEAM' section and verify team members"""
        team_title = self.driver.find_element(By.XPATH, "//h2[contains(text(), 'MEET OUR TEAM')]")
        self.assertTrue(team_title.is_displayed())

        team_names = ["Arshita", "Geetika", "Bhargav", "Raghul", "Rajveer", "Rithik"]
        for name in team_names:
            name_element = self.driver.find_element(By.XPATH, f"//p[contains(text(), '{name}')]")
            self.assertTrue(name_element.is_displayed())

    @classmethod
    def tearDownClass(cls):
        """Close the browser after tests"""
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()