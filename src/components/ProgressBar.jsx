import 'bootstrap/dist/css/bootstrap.min.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress mt-4">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default ProgressBar;
