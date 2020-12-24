# Tidysum

[![CircleCI](https://circleci.com/gh/danielabar/tidysum.svg?style=svg)](https://circleci.com/gh/danielabar/tidysum)

> A budget is telling your money where to go instead of wondering where it went.
>
> -- <cite>Dave Ramsey</cite>

Tidysum is an npm module to help you get insights into your variable spending and improve savings. It analyzes variable spending and reports on total and average spending by category by month and year. It can also make suggestions on how much to save each month or if spending needs to be reduced, and advises on total savings needed for 6 and 12 months worth of total living expenses, aka how much you should set aside in an emergency fund. It also calculates percentage differences in total and category spending year over year, think of this as your personalized rate of inflation as it reflects price increases (or decreases) in the things you actually buy over time rather than the theoretical basket of goods measured by the CPI.

## Usage

```shell
npx tidysum -e /path/to/expenses.csv
```

Where `expenses.csv` contains entries with date (YYYY-MM-DD), amount, category and merchant as per the example below:

You are not limited to the example categories or merchants below, pass in any values and the categories and merchants will be discovered when the expense file is processed.

```
2018-10-01,34.29,Groceries,Loblaws
2018-10-01,133.99,Restaurant,The Keg
2018-10-04,5.99,Entertainment,Amazon
2018-10-15,54.00,Groceries,Loblaws
2018-11-15,11.67,Health,Loblaws
2019-10-15,120,Groceries,Loblaws
2019-10-20,20,Restaurant,Dominos
2019-10-25,10.00,Entertainment,Apple
2019-11-10,12.49,Health,Whole Foods

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
    },
    "percentageDiffPreviousYear": "N/A"
  },
  "2019": {
    "total": "162.49",
    "Oct": {
      "total": "150",
      "byCategory": {
        "Groceries": "120",
        "Restaurant": "20",
        "Entertainment": "10.00"
      },
      "byMerchant": {
        "Loblaws": "120",
        "Dominos": "20",
        "Apple": "10.00"
      }
    },
    "Nov": {
      "total": "12.49",
      "byCategory": {
        "Health": "12.49"
      },
      "byMerchant": {
        "Whole Foods": "12.49"
      }
    },
    "average": {
      "monthly": "81.25",
      "byCategory": {
        "Groceries": "60.00",
        "Restaurant": "10.00",
        "Entertainment": "5.00",
        "Health": "6.25"
      }
    },
    "percentageDiffPreviousYear": {
      "total": "-32.28",
      "Groceries": "35.9",
      "Restaurant": "-85.07",
      "Entertainment": "66.67",
      "Health": "7.02"
    }
  }
}
```

Here you can see total spending for the year 2018 of `239.94` and in 2019 of `162.49`. Total is also calculated for each month, and each month is further broken down with totals by category and merchant.

The `average` section is generated for each year showing how much you spent on average each month, `119.87` in example above for 2018 and `81.25` for 2019. And how much you spent on average in each category, for example, spending on restaurants was on average `67.00` per month in 2018 whereas it was an average of `10.00` per month in 2019.

Finally, the `percentageDiffPreviousYear` shows percentage difference in spending as compared to the previous year. So if you started tracking in 2018, this will be `N/A` as there is no previous year. But 2019 will be compared to 2018. In this example total spending has gone down by 32.28%. Percentage differences are also calculated for each category, for example grocery spending went up by 35.9% whereas restaurant spending went down by 85.07%.

### Recommendations

Tidysum can also make some recommendations about how much you could be saving or suggestion to reduce spending. It will also calculate how much you should have saved to cover 6 and 12 months worth of living expenses. To make use of this, provide your monthly income (net of tax) and fixed expenses (eg: sum of mortgage, utilities, car payments etc) as additional arguments.

For example, if your monthly income is $3,000 and monthly fixed expenses are $1,000:

```shell
npx tidysum -e /path/to/expenses.csv -i 3000 -f 1000
# check expenses.json for output
```

If your total monthly expenditures (calculated average based on variable expenses + fixed expenses) are exceeding monthly income, tidysum will recommend you reduce spending. For example, if tidysum determines your average variable expenses are 2200, then 2200 + fixed of 1000 is 3200, which exceeds monthly income by 200, so it would recommend to reduce monthly spending by 200:

```javascript
...
"recommendation": {
  "reduceSpendingBy": "200.00",
  "save6MonthsExpenses": "19200",
  "save12MonthsExpenses": "38400"
}
```

On the other hand, if your monthly income exceeds expenditures, tidysum will recommend how much you could be saving each month. For example, if your average variable expenses are 1700, then 1700 + fixed of 1000 is 2700, which is less than monthly income of 3000, by 300, so it would recommend to save 300 each month:

```javascript
...
"recommendation": {
  "save": "300.00",
  "save6MonthsExpenses": "16200",
  "save12MonthsExpenses": "32400"
}
```

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

**TDD**

Run tests continuously watching for changes:

```shell
npm run dev
```

**Regenerate Snapshots**

```shell
SNAPSHOT_UPDATE=true npm test
```
