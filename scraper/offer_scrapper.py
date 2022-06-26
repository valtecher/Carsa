from webdriver_manager.firefox import GeckoDriverManager
from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support import expected_conditions as EC

import sys

o = Options()
o.headless = True
s = Service(GeckoDriverManager().install())
driver = webdriver.Firefox(options=o, service=s)
driver.get(sys.argv[1])

# close accept privacy
try:
    WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "button#onetrust-accept-btn-handler"))).click()
except:
    pass

def getAttributeValue(root_element, attr_label):
    label = root_element.find_element(By.XPATH, f'//span[text()="{attr_label}"]')
    wrapper = label.find_element(By.XPATH, '..')
    attr_value = wrapper.find_element(By.CSS_SELECTOR, '*.offer-params__value').text

    return attr_value

def getImgSources():
    img_wrapper = WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, 'div.slick-track')))

    images = img_wrapper.find_elements(By.CSS_SELECTOR, 'div.slick-slide')

    for index, img in enumerate(images):
        tmp = img.find_element(By.TAG_NAME, 'img').get_attribute('src')
        images[index] = tmp if tmp else img.find_element(By.TAG_NAME, 'img').get_attribute('data-lazy')

    return images

offer_params = WebDriverWait(driver, 5).until(
    EC.visibility_of_element_located((By.CSS_SELECTOR, 'div#parameters')))

description = WebDriverWait(driver, 5).until(
    EC.visibility_of_element_located((By.CSS_SELECTOR, 'div.offer-description__description'))).text

# driver.quit()

car_data = {
    "brand": getAttributeValue(offer_params, 'Marka pojazdu'),
    "model": getAttributeValue(offer_params, 'Model pojazdu'),
    "type": getAttributeValue(offer_params, 'Typ nadwozia'),
    "year": getAttributeValue(offer_params, 'Rok produkcji'),
    "power": getAttributeValue(offer_params, 'Moc'),
    "fuel_type": getAttributeValue(offer_params, 'Rodzaj paliwa'),
    "mileage": getAttributeValue(offer_params, 'Przebieg'),
    "engine_volume": getAttributeValue(offer_params, 'Pojemność skokowa'),
    "color": getAttributeValue(offer_params, 'Kolor'),
    "description": description,
    "images": getImgSources(),
}

print(car_data)











