package com.react_audio_player.model;

import com.react_audio_player.utils.PlayerUtil;

public class Songs {

    private long songID;
    private String songName;
    private String albumName;
    private String artistName;
    private String fullPath;
    private long songLength;

    public Songs(long songID, String songName, String artistName, String albumName, String fullPath, long songLength) {
        this.songID = songID;
        this.songName = songName;
        this.artistName = artistName;
        this.albumName = albumName;
        this.fullPath = fullPath;
        this.songLength = songLength;
    }


    public void setSongID(long songID) {
        this.songID = songID;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public void setFullPath(String fullPath) {
        this.fullPath = fullPath;
    }

    public void setSongLength(long songLength) {
        this.songLength = songLength;
    }

    public long getSongID() {
        return songID;
    }

    public String getSongName() {
        return songName;
    }

    public String getAlbumName() {
        return albumName;
    }

    public String getFullPath() {
        return fullPath;
    }

    public long getSongLength() {
        return Long.valueOf(PlayerUtil.milliSecondsToTimer(songLength));
    }
}