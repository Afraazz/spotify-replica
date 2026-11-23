
function TrackList({ tracks, onTrackSelect }) {
  return (
    <div className="track-list">
      {tracks.map((track, index) => (
        <div
          className="track-row"
          key={track.id}
          onClick={() => onTrackSelect(track)}
          style={{ cursor: 'pointer' }}
        >
          <span className="track-number">{index + 1}</span>

          <div className="track-details">
            <h4>{track.title}</h4>
            <p>{track.artist}</p>
          </div>

          <span className="track-album">{track.album}</span>
          <span className="track-duration">{track.duration}</span>
        </div>
      ))}
    </div>
  );
}

export default TrackList;
