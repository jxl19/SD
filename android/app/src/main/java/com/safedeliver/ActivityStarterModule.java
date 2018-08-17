package com.safedeliver;
import android.support.v7.app.AppCompatActivity;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.content.Context;
import android.content.SharedPreferences;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import android.util.Log;
import java.util.HashMap;
import java.util.Map;
import android.app.Application;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.Toast;

class ActivityStarterModule extends ReactContextBaseJavaModule {
    private static DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;
    private static final String FILE_NAME = "uId.txt";
    ActivityStarterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initialize() {
        super.initialize();
        eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    @Override
    public String getName(){
        return "ActivityStarter";
    }

    @ReactMethod
    public void toggleButton() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            Intent intent = new Intent(activity, ToggleActivity.class);
            activity.startActivity(intent);
        }
    }
    //if doesnt work we can send that id to server from here? and then we grab the data back? but then we're at the same issue... how do we save that into this side of the app..

    //if we get user id in server 
    @ReactMethod 
    public void grabInfo(String infoA) {
         Log.i("info", "from rn: " + infoA);
        //  FileOutputStream fos = null;
 
         try {
             FileOutputStream fos = getReactApplicationContext().openFileOutput(FILE_NAME, Context.MODE_PRIVATE);
             fos.write(infoA.getBytes());
             fos.close();
         } catch (Exception e) {
             e.printStackTrace();
             Log.i("infodebug", "unable to save file");
         }
}
    }
