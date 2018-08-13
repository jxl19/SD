package com.safedeliver;

import android.app.Activity;
import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.IBinder;
import android.util.Log;
import android.view.*;
import android.widget.Button;
import android.content.pm.PackageManager;


public class FloatingButtonService extends Service {

    private View floatingBubbleView;
    private View numPad;
    private WindowManager windowManager;
    private boolean trueFalse;  
    private int lati;
    
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            if (startId == Service.START_STICKY) {
                handleStart();
            }
        }
        return super.onStartCommand(intent, flags, startId);
    }

    /**
     * initiates the layout params and defines a onTouch listener to drag it on user interaction.
     * */
    private void handleStart() {
        windowManager = (WindowManager)getSystemService(WINDOW_SERVICE);
        floatingBubbleView = LayoutInflater.from(this).inflate(R.layout.floating_bubble_layout, null);
        handleFloatingBubble();
        minimizeApp();
    }

    /**
     * @Require windowManager and floatingBubbleView be initialized.
     *
     * <p> sets the close button on-click event handler.</p>
     */
    private void minimizeApp() {
        Intent startMain = new Intent(Intent.ACTION_MAIN);
        startMain.addCategory(Intent.CATEGORY_HOME);
        startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(startMain);
    }
    //reopen the app
    private void startApp(){
        Intent i = new Intent(Intent.ACTION_MAIN);
        PackageManager managerclock = getPackageManager();
        i = managerclock.getLaunchIntentForPackage("com.safedeliver");
        i.addCategory(Intent.CATEGORY_LAUNCHER);
        startActivity(i);
    }
    private void numPad() {
        Intent myIntent = new Intent(getApplicationContext(), NumberPadActivity.class);
        myIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(myIntent);
    }
    private void location() {
        Intent myIntent = new Intent(getApplicationContext(), MapsActivity.class);
        myIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(myIntent);
    }
    private void handleFloatingBubble() {
        final WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE |
                WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH |
                WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                PixelFormat.TRANSLUCENT);

        params.gravity = Gravity.TOP | Gravity.RIGHT;
        params.x = 150;
        params.y = 150;

        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        windowManager.addView(floatingBubbleView, params);
    
        Button btn = (Button) floatingBubbleView.findViewById(R.id.btnDoMagic);
        btn.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Log.i("MyApp","This is a magic log message!");
                trueFalse = false;
                Log.i("boolfalse", Boolean.toString(trueFalse));
                startApp();
                location();
                numPad();
                stopSelf();
            }
        });

        btn.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                Log.i("Long Click", "Longclick!");
                trueFalse = true;
                Log.i("booltrue", Boolean.toString(trueFalse));
                return false;
            }
        });
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (floatingBubbleView != null) windowManager.removeView(floatingBubbleView);
    }
}