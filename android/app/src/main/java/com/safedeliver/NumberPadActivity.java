package com.safedeliver;

import android.os.Bundle;
import android.app.Activity;
import com.facebook.react.ReactActivity;
import android.view.View;
import android.view.View.OnClickListener;

import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.widget.TextView;
import android.view.KeyEvent;
import android.text.InputType;
import android.view.inputmethod.EditorInfo;

public class NumberPadActivity extends ReactActivity {
   EditText eText;
   Button btn;
   //make this pop up on end of button press....
   @Override
   protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.numpad);
      eText = (EditText) findViewById(R.id.edittext);
      eText.setInputType(InputType.TYPE_CLASS_NUMBER);
      eText.setOnEditorActionListener(new EditText.OnEditorActionListener() {
        @Override
        public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
            if (actionId == EditorInfo.IME_ACTION_DONE) {
                       String str = eText.getText().toString();
                       Toast msg = Toast.makeText(getBaseContext(),str,Toast.LENGTH_LONG);
                       msg.show();
                return true;
            }
            return false;
        }
    });
   }
}