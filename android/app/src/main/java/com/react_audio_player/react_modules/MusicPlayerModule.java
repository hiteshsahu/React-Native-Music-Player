package com.react_audio_player.react_modules;

import android.os.Handler;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.react_audio_player.MainActivity;
import com.react_audio_player.domain.DemoDataProvider;
import com.react_audio_player.domain.DemoPlayer;
import com.react_audio_player.domain.SongCompletionListener;
import com.react_audio_player.model.SongsCollection;
import com.react_audio_player.utils.AppContants;
import com.react_audio_player.utils.PlayerUtil;

import static com.react_audio_player.utils.AppContants.AUDIO_PLAYER_MODULE_NAME;
import static com.react_audio_player.utils.AppContants.DELAY_MILLIS;
import static com.react_audio_player.utils.AppContants.EVENT_SONG_CHANGED;
import static com.react_audio_player.utils.AppContants.EVENT_UPDATE_PROGRESS;
import static com.react_audio_player.utils.AppContants.KEY_SONG_PAUSED;
import static com.react_audio_player.utils.AppContants.KEY_SONG_PROGRESS;
import static com.react_audio_player.utils.AppContants.KEY_UPDATE_ALBUM_ART;
import static com.react_audio_player.utils.AppContants.KEY_UPDATE_DURATION;
import static com.react_audio_player.utils.AppContants.KEY_UPDATE_SEEK_POSTION;
import static com.react_audio_player.utils.AppContants.KEY_UPDATE_SONG_NAME;

/**
 * Created by hitesh.sahu on 7/17/2017.
 */

public class MusicPlayerModule extends ReactContextBaseJavaModule implements SongCompletionListener {
    private static final String TAG = MusicPlayerModule.class.getSimpleName();

    private final ReactApplicationContext reactAppContext;

    //State variables
    private int currentSelectedSong = 0;
    private boolean IS_SONG_PAUSED = false;

    //Song progress Update Handler
    private Runnable updateProgressTask = new Runnable() {
        public void run() {
            new Handler(reactAppContext.getMainLooper()).post(new Runnable() {
                @Override
                public void run() {

                    //Update Song progress info on React Native UI
                    WritableMap params = Arguments.createMap();
                    params.putInt(KEY_UPDATE_SEEK_POSTION, DemoPlayer.getInstance().getProgress());
                    params.putString(KEY_SONG_PROGRESS, DemoPlayer.getInstance().getCurrentDuration());
                    sendEvent(reactAppContext, EVENT_UPDATE_PROGRESS, params);
                }
            });
            // Running this thread after 100 milliseconds
            ((MainActivity) getCurrentActivity()).getSongProgressHandler().postDelayed(this, DELAY_MILLIS);
        }
    };

    @Override
    public String getName() {
        return AUDIO_PLAYER_MODULE_NAME;
    }

    public MusicPlayerModule(ReactApplicationContext reactAppContext) {
        super(reactAppContext);
        this.reactAppContext = reactAppContext;
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


    /**
     * Play Song and update UI
     * @param songURL
     * @param songName
     * @param AlbumArt
     */
    @ReactMethod
    public void playThisSong(String songURL, String songName, String AlbumArt) {
        if (IS_SONG_PAUSED) {
            DemoPlayer.getInstance().resume();
        } else {
            DemoPlayer.getInstance().play(songURL,
                    MusicPlayerModule.this);
        }
        IS_SONG_PAUSED = false;

        //Update UI with new SOng Info
        WritableMap paramsUI = Arguments.createMap();
        paramsUI.putString(KEY_UPDATE_SONG_NAME, songName);
        paramsUI.putString(KEY_UPDATE_ALBUM_ART, AlbumArt);
        paramsUI.putString(KEY_UPDATE_DURATION, PlayerUtil.milliSecondsToTimer(DemoPlayer.getInstance().getPlayer()
                .getDuration()));
        paramsUI.putInt(KEY_UPDATE_SEEK_POSTION, DemoPlayer.getInstance().getProgress());
        sendEvent(reactAppContext, EVENT_SONG_CHANGED, paramsUI);

        //Start Progress bar update
        ((MainActivity) getCurrentActivity()).getSongProgressHandler().postDelayed(updateProgressTask, DELAY_MILLIS);
        WritableMap params = Arguments.createMap();
        params.putBoolean(KEY_SONG_PAUSED, IS_SONG_PAUSED);
        params.putInt(KEY_UPDATE_SEEK_POSTION, DemoPlayer.getInstance().getProgress());
        sendEvent(reactAppContext, EVENT_UPDATE_PROGRESS, params);
    }

    /**
     * Pause playback
     */
    @ReactMethod
    public void pauseThisSong() {

        DemoPlayer.getInstance().pause();

        IS_SONG_PAUSED = true;

        //Stop Progressbar update
        ((MainActivity) getCurrentActivity()).getSongProgressHandler().removeCallbacks(updateProgressTask);
        WritableMap params = Arguments.createMap();
        params.putBoolean(KEY_SONG_PAUSED, IS_SONG_PAUSED);
        sendEvent(reactAppContext, EVENT_UPDATE_PROGRESS, params);
    }

    /**
     * Seek Song progress
     * @param percentageSeekProgress
     */
    @ReactMethod
    public void seekTo(int percentageSeekProgress) {
        //Pause Progress bar update
        ((MainActivity) getCurrentActivity()).getSongProgressHandler().removeCallbacks(updateProgressTask);

        int songDuration = DemoPlayer.getInstance().getPlayer()
                .getDuration();

        //convert % progress to real progress
        int seekPosition = PlayerUtil.progressToTimer(percentageSeekProgress, songDuration);

        // forward or backward to certain seconds
        DemoPlayer.getInstance().getPlayer().seekTo(seekPosition);

        //Start Progress bar update
        ((MainActivity) getCurrentActivity()).getSongProgressHandler().postDelayed(updateProgressTask, AppContants.DELAY_MILLIS);
    }


    /**
     * Get all songs from SD card
     * @param errorCallback
     * @param successCallback
     */
    @ReactMethod
    public void fetchAllSongs(Callback errorCallback,
                              Callback successCallback) {
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

    private void playNextSong() {
        //if nth song completed play n+1th till last song come , If last song came play 0th
        if (currentSelectedSong < SongsCollection.getInstance().getListOfSongs().size() - 1) {
            ++currentSelectedSong;
        } else {
            currentSelectedSong = 0;
        }

        DemoPlayer.getInstance().play(getCurrentSongPath(),
                MusicPlayerModule.this);

        //Update UI with next SOng Info
        WritableMap paramsUI = Arguments.createMap();
        paramsUI.putString(KEY_UPDATE_SONG_NAME, SongsCollection.getInstance().getListOfSongs().get(currentSelectedSong).getSongName());
        paramsUI.putString(KEY_UPDATE_ALBUM_ART, SongsCollection.getInstance().getListOfSongs().get(currentSelectedSong).getAlbumArt());
        paramsUI.putString(KEY_UPDATE_DURATION, PlayerUtil.milliSecondsToTimer(DemoPlayer.getInstance().getPlayer().getDuration()));
        paramsUI.putInt(KEY_UPDATE_SEEK_POSTION, DemoPlayer.getInstance().getProgress());
        sendEvent(reactAppContext, EVENT_SONG_CHANGED, paramsUI);

        //Start Progress bar update
        ((MainActivity) getCurrentActivity()).getSongProgressHandler().postDelayed(updateProgressTask, DELAY_MILLIS);
        WritableMap params = Arguments.createMap();
        params.putBoolean(KEY_SONG_PAUSED, IS_SONG_PAUSED);
        sendEvent(reactAppContext, EVENT_UPDATE_PROGRESS, params);
    }


    private String getCurrentSongPath() {
        return SongsCollection.getInstance().getListOfSongs().get(currentSelectedSong).getFullPath();
    }

    @Override
    public void onSongCompletion() {
        //Stop Progressbar update
        ((MainActivity) getCurrentActivity()).getSongProgressHandler().removeCallbacks(updateProgressTask);

        //Start Playback
        playNextSong();
    }
}
