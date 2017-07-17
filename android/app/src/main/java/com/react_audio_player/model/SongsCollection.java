package com.react_audio_player.model;

import java.util.ArrayList;

/**
 * Created by hitesh.sahu on 7/17/2017.
 */
public class SongsCollection {

    private ArrayList<Songs> listOfSongs = new ArrayList<>();

    public ArrayList<Songs> getListOfSongs() {
        return listOfSongs;
    }

    public void setListOfSongs(ArrayList<Songs> listOfSongs) {
        this.listOfSongs = listOfSongs;
    }

    private static SongsCollection ourInstance = new SongsCollection();

    public static SongsCollection getInstance() {
        return ourInstance;
    }

    private SongsCollection() {
    }
}
