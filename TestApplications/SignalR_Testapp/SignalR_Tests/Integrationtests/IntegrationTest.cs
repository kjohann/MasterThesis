using System;
using System.Threading;
using NUnit.Framework;
using Selenium;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

namespace SignalR_Tests.Integrationtests
{
    [TestFixture]
    public class IntegrationTest
    {
        //private ISelenium _selenium;
        private const string _url = "http://localhost:55143/Views/index.html";
        private IWebDriver _driver;

        [SetUp]
        public void setUp()
        {
            DataHelpers.DbRefresher.refresh();
            _driver = new FirefoxDriver();
            _driver.Navigate().GoToUrl(_url);
            _driver.FindElement(By.LinkText("Log in")).Click();
            _driver.FindElement(By.CssSelector("#log_usern")).SendKeys("Mozilla");
            _driver.FindElement(By.CssSelector("#log_pass")).SendKeys("123");
            _driver.FindElement(By.CssSelector("#log_in_button")).Click();
            wait(false, 3, By.LinkText("Mozilla"), 0, "Mozilla");
        }

        [Test]
        public void titleTest()
        {
            Assert.AreEqual("Auction House", _driver.Title);
        } 

        [Test]
        public void canGetInitialItemsTest()
        {
            wait(true, 3, By.CssSelector(".item"), 3, null);
        }

        [Test]
        public void canAddItem()
        {
            _driver.FindElement((By.CssSelector("#addItemButton"))).Click();
            _driver.FindElement(By.CssSelector("#itemname")).SendKeys("Selenium");
            _driver.FindElement(By.CssSelector("#minprice")).SendKeys("1337");
            _driver.FindElement(By.CssSelector("#expires")).SendKeys("2014-03-12");
            _driver.FindElement(By.CssSelector("#description")).SendKeys("This was added by an automated test.");
            _driver.FindElement(By.CssSelector(("#addButton"))).Click();
            wait(true, 3, By.CssSelector(".item"), 4, null);
        }

        [Test]
        public void canPlaceBid()
        {
            _driver.FindElements(By.CssSelector(".bidButton"))[0].Click();
            _driver.FindElement(By.CssSelector("#bid")).Clear();
            _driver.FindElement(By.CssSelector("#bid")).SendKeys("450000");
            _driver.FindElement(By.CssSelector("#place_bid_button")).Click();
            wait(true, 3, By.XPath("//span[starts-with(.,'450000')]"), 1, null);
        }

        [Test]
        public void canRemoveItem()
        {
            _driver.FindElements(By.CssSelector(".removeButton"))[1].Click();
            wait(true, 3, By.CssSelector(".item"), 2, null);
        }

        [TearDown]
        public void tearDown()
        {
            try
            {
                _driver.Quit();
                DataHelpers.DbRefresher.refresh();
            }
            catch (Exception e)
            {                
                
            }
        }

        private void wait(bool many, int seconds, By by, int count, string equalTo)
        {
            var wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(seconds));
            if (many)
                wait.Until(d => d.FindElements(by).Count == count);
            else
                wait.Until(d => d.FindElement(by).Text.Equals(equalTo));
        }
    }
}
