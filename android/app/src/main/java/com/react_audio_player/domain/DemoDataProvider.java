package com.react_audio_player.domain;

import android.content.Context;
import android.database.Cursor;
import android.provider.MediaStore;

import com.react_audio_player.model.Songs;
import com.react_audio_player.model.SongsCollection;

public class DemoDataProvider {

    private static DemoDataProvider demoDataProvider;

    private DemoDataProvider() {
    }

    public static DemoDataProvider getInstance() {
        if (null == demoDataProvider) {
            demoDataProvider = new DemoDataProvider();
        }
        return demoDataProvider;
    }

    /**
     * It Not used AnyWhere in Project but it's Helpful while you need to get all mp3 file in sdcard.
     * it's nothing but just for future used
     */
    public void getAllSongs(Context context) {

        //Clear old data
        SongsCollection.getInstance().getListOfSongs().clear();

        String[] STAR = null;
        Cursor cursor = context.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, STAR,
                MediaStore.Audio.Media.IS_MUSIC + " != 0", null, null);

        if (cursor != null) {
            if (cursor.moveToFirst()) {
                do {
                    SongsCollection.getInstance().getListOfSongs().add(new Songs(
                            cursor.getInt(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM_ID)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DISPLAY_NAME)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM)),
                            cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA)),
                            cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media.DURATION))));


                } while (cursor.moveToNext());
            }
            cursor.close();
        }
    }


}
