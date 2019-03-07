#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.northstarlds.northstarconf/host.exp.exponent.MainActivity
