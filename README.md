# Sitemap Checker

A small script which downloads every page from sitemap.xml as Google Crawler and save it as a screenshot.
Allows you to easily check, how your JavaScript website will be shown for Google Crawler. 

## Usage

0. Install [PhantomJS](http://phantomjs.org/download.html)
1. Clone the project `git clone https://github.com/mrded/sitemapChecker.git`
2. Install dependencies `npm i`
3. Download a `sitemap.xml` file into root folder of the project.
4. Run the script `npm start` 
5. Expect screenshots on `screenshots/` folder.


## Arguments

`npm start -- [skip]`

- To skip first 42 urls `npm start -- 42`
