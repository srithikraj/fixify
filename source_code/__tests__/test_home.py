from selenium import webdriver
from selenium.webdriver.common.by import By
import unittest

class TestHomePage(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()  # Use Firefox() if needed
        self.driver.get("http://localhost:5173/")

    def test_navbar_present(self):
        self.assertTrue(self.driver.find_element(By.ID, "navbar"), "Navbar not found!")

    def test_hero_present(self):
        self.assertTrue(self.driver.find_element(By.ID, "hero"), "Hero section not found!")

    def test_how_it_works_present(self):
        self.assertTrue(self.driver.find_element(By.ID, "howitworks"), "How It Works section not found!")

    def test_services_present(self):
        self.assertTrue(self.driver.find_element(By.ID, "servicesection"), "Services section not found!")

    def test_get_started_present(self):
        self.assertTrue(self.driver.find_element(By.ID, "getstarted"), "Get Started section not found!")

    def test_footer_present(self):
        self.assertTrue(self.driver.find_element(By.ID, "footer_code"), "Footer not found!")

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()