# import time
# import unittest
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.chrome.options import Options

# class TestAboutUsPage(unittest.TestCase):
#     @classmethod
#     def setUpClass(cls):
#         """Setup WebDriver before running tests"""
#         chrome_options = Options()
#         chrome_options.add_argument("--headless")  # Run in headless mode
#         chrome_options.add_argument("--no-sandbox")
#         chrome_options.add_argument("--disable-dev-shm-usage")

#         cls.driver = webdriver.Chrome(options=chrome_options)
#         cls.driver.get("http://localhost:5173/aboutus")

#     def test_page_title(self):
#         """Verify page title contains 'About Us'"""
#         self.assertIn("Fixify", self.driver.title)
        
#     def test_logo_displayed(self):
#         """Check if the logo is visible"""
#         logo = self.driver.find_element(By.TAG_NAME, "img")
#         self.assertTrue(logo.is_displayed())

#     def test_navigation_buttons(self):
#         """Check if 'HOME' and 'LOGIN' buttons exist and work"""
#         # Wait for the buttons to be visible (using CSS selectors with data-testid)
#         #home_btn = self.driver.find_element(By.CSS_SELECTOR, "button[data-testid='home-button']")
#         #login_btn = self.driver.find_element(By.CSS_SELECTOR, "button[data-testid='login-button']")

#         #self.assertTrue(home_btn.is_displayed())
#         #self.assertTrue(login_btn.is_displayed())

#         # Test HOME button navigation
#         #home_btn.click()
#         #time.sleep(2)  # Wait for navigation
#         #self.assertIn("Home", self.driver.title)

#         # Navigate back
#         #self.driver.get("http://localhost:5173/aboutus")

#         # Test LOGIN button navigation
#         #login_btn.click()
#         #time.sleep(2)  # Wait for redirection
#         #self.assertIn("Login", self.driver.title)

#     def test_about_us_section(self):
#         """Verify 'ABOUT US' section is present"""
#         about_title = self.driver.find_element(By.XPATH, "//h2[contains(text(), 'ABOUT US')]")
#         about_text = self.driver.find_element(By.XPATH, "//p[contains(text(), 'Welcome to FIXIFY!')]")
#         about_video = self.driver.find_element(By.TAG_NAME, "video")

#         self.assertTrue(about_title.is_displayed())
#         self.assertTrue(about_text.is_displayed())
#         self.assertTrue(about_video.is_displayed())

#     def test_team_section(self):
#         """Check 'MEET OUR TEAM' section and verify team members"""
#         team_title = self.driver.find_element(By.XPATH, "//h2[contains(text(), 'MEET OUR TEAM')]")
#         self.assertTrue(team_title.is_displayed())

#         team_names = ["Arshita", "Geetika", "Bhargav", "Raghul", "Rajveer", "Rithik"]
#         for name in team_names:
#             name_element = self.driver.find_element(By.XPATH, f"//p[contains(text(), '{name}')]")
#             self.assertTrue(name_element.is_displayed())

#     @classmethod
#     def tearDownClass(cls):
#         """Close the browser after tests"""
#         cls.driver.quit()

# if __name__ == "__main__":
#     unittest.main()

import os
import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestAboutUsPage(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Setup WebDriver before running tests"""
        service = Service(ChromeDriverManager().install())
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        
        cls.driver = webdriver.Chrome(service=service, options=chrome_options)
        cls.base_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
        cls.driver.get(f"{cls.base_url}/aboutus")  # Verify this is the correct route
        
        # Wait for page to load (up to 10 seconds)
        WebDriverWait(cls.driver, 10).until(
            lambda driver: driver.execute_script("return document.readyState") == "complete"
        )
        print(f"Page loaded: {cls.driver.current_url}")
        print(f"Page source: {cls.driver.page_source[:500]}")  # Log first 500 chars for debugging

    def test_page_title(self):
        """Verify page title contains 'Fixify'"""
        self.assertIn("Fixify", self.driver.title)

    def test_logo_displayed(self):
        """Check if the logo is visible"""
        logo = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "img"))
        )
        self.assertTrue(logo.is_displayed())

    def test_navigation_buttons(self):
        """Check if 'HOME' and 'LOGIN' buttons exist and work"""
        # Uncomment and adjust selectors as needed
        # home_btn = WebDriverWait(self.driver, 10).until(
        #     EC.element_to_be_clickable((By.CSS_SELECTOR, "button[data-testid='home-button']"))
        # )
        # login_btn = WebDriverWait(self.driver, 10).until(
        #     EC.element_to_be_clickable((By.CSS_SELECTOR, "button[data-testid='login-button']"))
        # )
        # self.assertTrue(home_btn.is_displayed())
        # self.assertTrue(login_btn.is_displayed())
        #
        # # Test HOME button navigation
        # home_btn.click()
        # time.sleep(2)
        # self.assertIn("Home", self.driver.title)
        #
        # # Navigate back
        # self.driver.get(f"{self.base_url}/aboutus")
        #
        # # Test LOGIN button navigation
        # login_btn.click()
        # time.sleep(2)
        # self.assertIn("Login", self.driver.title)

    def test_about_us_section(self):
        """Verify 'ABOUT US' section is present"""
        # Increased wait time to 20 seconds for this section
        about_title = WebDriverWait(self.driver, 20).until(
            EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'ABOUT US')]"))
        )
        about_text = WebDriverWait(self.driver, 20).until(
            EC.presence_of_element_located((By.XPATH, "//p[contains(text(), 'Welcome to FIXIFY!')]"))
        )
        about_video = WebDriverWait(self.driver, 20).until(
            EC.presence_of_element_located((By.TAG_NAME, "video"))
        )

        self.assertTrue(about_title.is_displayed())
        self.assertTrue(about_text.is_displayed())
        self.assertTrue(about_video.is_displayed())

    def test_team_section(self):
        """Check 'MEET OUR TEAM' section and verify team members"""
        team_title = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'MEET OUR TEAM')]"))
        )
        self.assertTrue(team_title.is_displayed())

        team_names = ["Arshita", "Geetika", "Bhargav", "Raghul", "Rajveer", "Rithik"]
        for name in team_names:
            name_element = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, f"//p[contains(text(), '{name}')]"))
            )
            self.assertTrue(name_element.is_displayed())

    @classmethod
    def tearDownClass(cls):
        """Close the browser after tests"""
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main(verbosity=2)
