package com.safedeliver;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.IBinder;
import android.util.Log;
import android.view.*;
import android.widget.Button;

public class FloatingButtonService extends Service {

    private View floatingBubbleView;
    private WindowManager windowManager;

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

    }

    /**
     * @Require windowManager and floatingBubbleView be initialized.
     *
     * <p> sets the close button on-click event handler.</p>
     */
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
            }
        });
        btn.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                Log.i("Long Click", "Longclick!");
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