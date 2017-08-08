package com.react_audio_player.utils;

import android.net.Uri;

/**
 * Created by Hitesh on 23-07-2016.
 */
public interface AppContants {

    Uri sArtworkUri = Uri
            .parse("content://media/external/audio/albumart");
    String AUDIO_PLAYER_MODULE_NAME = "MusicPlayerModule";
    String KEY_SONG_PROGRESS = "SongProgress";
    String EVENT_UPDATE_PROGRESS = "UpdateProgress";
    String KEY_SONG_PAUSED = "IsSongPauses";
    String EVENT_SONG_CHANGED = "songChanged";
    String KEY_UPDATE_SONG_NAME = "songName";
    String KEY_UPDATE_ALBUM_ART = "albumARt";
    String KEY_UPDATE_DURATION = "duration";
    String KEY_UPDATE_SEEK_POSTION = "seekTo";
    int DELAY_MILLIS = 1000;

}
