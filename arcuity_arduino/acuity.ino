#include <LiquidCrystal.h>
#include <Wire.h>
#include <RTClib.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
const int buzzerPin = 8;
RTC_DS3231 rtc;

void setup() {
  Serial.begin(9600);
  
  lcd.begin(16, 2);
  lcd.print("Daily Reminder");
  lcd.setCursor(0, 1);
  lcd.print("System");
  
  pinMode(buzzerPin, OUTPUT);
  
  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC");
    lcd.clear();
    lcd.print("RTC Error");
    while (1);
  }
  
  rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  
  delay(2000);
  lcd.clear();
}

void loop() {
  DateTime now = rtc.now();
  
  lcd.setCursor(0, 0);
  lcd.print("Time: ");
  if (now.hour() < 10) lcd.print("0");
  lcd.print(now.hour());
  lcd.print(":");
  if (now.minute() < 10) lcd.print("0");
  lcd.print(now.minute());
  lcd.print(":");
  if (now.second() < 10) lcd.print("0");
  lcd.print(now.second());
  
  if (now.hour() == 21 && now.minute() == 0 && now.second() < 10) {
    lcd.setCursor(0, 1);
    lcd.print("TIME TO REVIEW! ");
    
    for (int i = 0; i < 3; i++) {
      tone(buzzerPin, 1000);
      delay(500);
      noTone(buzzerPin);
      delay(300);
    }
  } else {
    lcd.setCursor(0, 1);
    lcd.print("Date: ");
    lcd.print(now.day());
    lcd.print("/");
    lcd.print(now.month());
    lcd.print("/");
    lcd.print(now.year());
    lcd.print(" ");
  }
  
  delay(1000);
}