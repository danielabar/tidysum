# Tidysum

[![CircleCI](https://circleci.com/gh/danielabar/tidysum.svg?style=svg)](https://circleci.com/gh/danielabar/tidysum)

> Get insights into your variable spending to help improve savings.

## Usage

```shell
tidysum -e /path/to/expenses.csv
```

Where `expenses.csv` contains entries with date (YYYY-MM-DD), amount, category and merchant as per the example below:

You are not limited to the example categories or merchants below, pass in any values and the categories and merchants will be discovered when the expense file is processed.

```
2018-10-01,34.29,Groceries,Loblaws
2018-10-01,133.99,Restaurant,The Keg
2018-10-04,5.99,Entertainment,Amazon
2018-10-15,54.00,Groceries,Loblaws
2018-11-15,11.67,Health,Loblaws
```

This will generate `expenses.json` with yearly and monthly breakdowns and averages per year. For the example above, the output is:

```javascript
{
  "2018": {
    "total": "239.94",
    "Oct": {
      "total": "228.27",
      "byCategory": {
        "Groceries": "88.29",
        "Restaurant": "133.99",
        "Entertainment": "5.99"
      },
      "byMerchant": {
        "Loblaws": "88.29",
        "The Keg": "133.99",
        "Amazon": "5.99"
      }
    },
    "Nov": {
      "total": "11.67",
      "byCategory": {
        "Health": "11.67"
      },
      "byMerchant": {
        "Loblaws": "11.67"
      }
    },
    "average": {
      "monthly": "119.97",
      "byCategory": {
        "Groceries": "44.15",
        "Restaurant": "67.00",
        "Entertainment": "3.00",
        "Health": "5.84"
      }
    }
  }
}
```

Here you can see total spending for the year of `239.94`. Total is also calculated for each month, and each month is further broken down with totals by category and merchant.

Finally an `average` section is generated for each year showing how much you spent on average each month, `119.87` in example above. And how much you spent on average in each category, for example, spending on restaurants was on average `67.00` per month.

### Why not use Excel?

Well, not everyone has Excel (or enjoys working with it). And even with Libre Office, some of the functions don't work quite as documented, and the result is static, not useful if you want dynamically discovered categories.

### Why not use an app or online service?

For those who care about their privacy and don't want to share personal spending data with a third party. This is a simple cli with absolutely no network calls so your data stays local to your computer.

## Development

```shell
npm i
npm link
node generate-sample-data.js
tidysum -e sample-data.csv
# check expenses.json for output
```

**Run Tests**

```shell
npm test
```

**Regenerate Snapshots**

```shell
SNAPSHOT_UPDATE=true npm test
```
