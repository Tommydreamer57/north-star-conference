#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.northstarconf.northstarlds/host.exp.exponent.MainActivity
