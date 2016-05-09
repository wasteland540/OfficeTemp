#include <Ethernet.h>
#include <SPI.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };  // MAC-ADdRESSE
byte ip[]  = { x, x, x, x };                    // IP arduino!
byte server[] = { x,x,x,x };                 // IP server

EthernetClient client;

char host[] = "domain.net";  // DOMAIN
char url[]  = "/OfficeTemp/ajax/pushTemp.php";  // path to php file
char key[] = "xxx-xxx-xxx-xxx-xxx";  // key from php file

int Sensor = 0;                // TMP36
float Temperature = 0;          

void setup()
{
  Serial.begin(9600);
  Serial.println("Program started...");
  Ethernet.begin(mac, ip);  
  delay(5000);        // wait until LAN started
}

void loop()
{
  ReadSensor();
  SendData();
  delay(900);

  delay(899000); //wait 15 min.
  client.stop();
  client.flush();
}

void ReadSensor()
{
  float voltage = (analogRead(Sensor) * 0.004882814);

  // Now we'll convert the voltage to degrees Celsius.
  // This formula comes from the temperature sensor datasheet:
  Temperature = (voltage - 0.5) * 100.0;

  Serial.print("Temperature: ");
  Serial.println(Temperature);
}

void SendData()
{
  int result = client.connect(server, 80);
  
  if (result)  // connect to server
  {
    Serial.print("connected...send data...");
    
    client.print("GET ");
    client.print(url);
    client.print("?TEMP=");
    client.print(Temperatur);
    client.print("&KEY=");
    client.print(key);
    client.println(" HTTP/1.1");
    client.print("Host: ");
    client.println(host);
    client.println();
  }
  else
  {
    Serial.println(" ***** CAN NOT CONNECT *****");
    Serial.println(result);
  }    
}
