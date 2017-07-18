package com.react_audio_player.react_modules;

import android.app.Activity;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;
import com.react_audio_player.domain.DemoDataProvider;
import com.react_audio_player.model.SongsCollection;

/**
 * Created by hitesh.sahu on 7/17/2017.
 */

public class MusicPlayerModule extends ReactContextBaseJavaModule {
    private static final String TAG = MusicPlayerModule.class.getSimpleName();
    private static final String AUDIO_PLAYER_MODULE_NAME = "MusicPlayerModule";
    private final ReactApplicationContext reactAppContext;
    private Activity activityContext;

    @Override
    public String getName() {
        return AUDIO_PLAYER_MODULE_NAME;
    }

    public MusicPlayerModule(ReactApplicationContext reactAppContext) {
        super(reactAppContext);
        this.reactAppContext = reactAppContext;
    }

    @ReactMethod
    public void fetchAllSongs(Callback errorCallback,
                              Callback successCallback) {
        activityContext = getCurrentActivity();

        //Fetch all songs
        DemoDataProvider.getInstance().getAllSongs(reactAppContext);

        //No Songs Found
        if (SongsCollection.getInstance().getListOfSongs().isEmpty()) {
            errorCallback.invoke("There are no Audio Files Found on This Device");
            return;
        }


        //Songs Found Convert to JSON and pass it back
        successCallback.invoke(new Gson().toJson(SongsCollection.getInstance().getListOfSongs()));
    }
}
