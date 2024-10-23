# Project-3---World-s-Best-Restaurants

Data from Kaggle World's Best Restaurants by Thomas Francois
Link of the dataset: https://www.kaggle.com/datasets/thomasfranois/worlds-best-restaurants/data
Source: https://www.theworlds50best.com/
Copyright: https://www.mit.edu/~amini/LICENSE.md

This data was scraped from the source: https://www.theworlds50best.com/ and the dataset contains the annual list of World's 50 Best Restuarants from 2002-2023. This annual list was created through a voting process by 1,000 culinary experts from 27 regions. One bias found was that there was a new rule starting in 2019 where any restuarant that ranked 1st place was not able to be voted in the following years. There is also MIT license on the dataset website that grants permission to obtain a copy of this software and associated documentations including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

3 views:
    1. Map all location by lat, lon.
        - with Popups for each marker, number of rankings for the restaurant, and the highest ranking
    2. Bar chart for top restaurants by country.
    3. Bar chart for top restaurant by repeat ranking. 
    4. Bump chart for top restaurant ranking over time.
        - https://nivo.rocks/bump/
filter:
    Change the displayed data by a country filter.
    Listerner function on Bump Chart for Mouse hover lines. 
