package com.react_audio_player;

import android.os.Handler;
import android.os.Message;

import com.facebook.react.ReactActivity;

import java.lang.ref.WeakReference;

public class MainActivity extends ReactActivity {

    public Handler getSongProgressHandler() {
        return songProgressHandler;
    }

    /**
     * Instances of static inner classes do not hold an implicit
     * reference to their outer class.
     */
    private static class NonLeakyHandler extends Handler {
        private final WeakReference<MainActivity> mActivity;

        public NonLeakyHandler(MainActivity activity) {
            mActivity = new WeakReference<MainActivity>(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            MainActivity activity = mActivity.get();
            if (activity != null) {
                // ...
            }
        }
    }

    //Song progress Update Handler
    private Handler songProgressHandler = new NonLeakyHandler(MainActivity.this);

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "React_Audio_Player";
    }
}
