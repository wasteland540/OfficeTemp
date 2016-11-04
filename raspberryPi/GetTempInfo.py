import json
import urllib
import urllib2
import collections
from datetime import datetime
import time

def getTempInfos(fromDate, toDate):
    #encode url parameter for get request
    params = urllib.urlencode({'from':fromDate, 'to':toDate})
    responseContent = urllib2.urlopen("http://url/OfficeTemp/ajax/getTempsByDate.php?" + params)

    #load json response
    js = json.load(responseContent)

    #get current date
    todayTemp = time.strftime("%Y-%m-%d")
    todayTemp = datetime.strptime(todayTemp, "%Y-%m-%d")

    #set start/end time for workday from 8am to 5pm
    workStart = todayTemp.replace(hour=8, minute=0)
    workEnd = todayTemp.replace(hour=17, minute=0)

    #declare variables for calculation
    entryCount = 0
    averageTemp = 0.0
    highestTemp = 0.0

    #loop throuth json objects 'Temps'
    for entry in js['Temps']:
        #convert date string to date object
        dateObject = datetime.strptime(entry['Date'], '%Y-%m-%d %H:%M:%S')

        #check if date is between start and end date
        if workStart < dateObject < workEnd:
            currentTemp = float(entry['Temp'])
            averageTemp += currentTemp
            entryCount += 1

            #determine highest temp
            if(currentTemp > highestTemp):
                highestTemp = currentTemp

    #determine average temp
    averageTemp /= entryCount
    averageTemp = round(averageTemp, 2)

    #create named tuple for return value
    tempInfo = collections.namedtuple('TempInfo', ['averageTemp', 'highestTemp'])
    tInfo = tempInfo(averageTemp, highestTemp)
        
    return tInfo
