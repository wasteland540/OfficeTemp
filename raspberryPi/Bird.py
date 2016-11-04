from GetTempInfo import getTempInfos
from datetime import datetime, timedelta
import time
from TwitterWrapper import tweet

#get current date
todayDate = time.strftime("%Y-%m-%d")

#create from and to date
fromDate = datetime.strptime(todayDate, "%Y-%m-%d")
toDate = fromDate + timedelta(days=1)

#get temp infos from GetTempInfo module
tInfo = getTempInfos(fromDate, toDate)
       
tweet(tInfo)

