#!/usr/bin/env bash
VERSION=1.0.$1
FILENAME=salon_$VERSION.apk
SIGNED_FILENAME=salon.app.aligned.apk
BUILDED_APP=platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
rm -f salon*.apk

head config.xml

ionic cordova build android --prod --release
zipalign -v 4 $BUILDED_APP $SIGNED_FILENAME
apksigner sign --ks android_keystore --out $FILENAME $SIGNED_FILENAME
adb install -r $FILENAME
echo DONE
