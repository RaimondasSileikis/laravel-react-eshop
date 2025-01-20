import PropTypes from 'prop-types';

const Skeleton = ({ type, className, count }) => {
  const skeletons = [...Array(count || 1)].map((_, index) => (
    <div key={index} className={`animate-pulse ${className}`}>
      {type === 'product' && (
        <div className="flex flex-col items-center">
          <div className="bg-gray-300 w-32 h-32 mb-4 rounded" />
          <div className="bg-gray-300 w-4/5 h-4 mb-2 rounded" />
          <div className="bg-gray-300 w-3/4 h-4 rounded" />
        </div>
      )}
      {type === 'cart' && (
        <div className="flex py-6">
          <div className="bg-gray-200 w-24 h-24 rounded-md"></div>
          <div className="ml-4 flex-1">
            <div className="bg-gray-200 w-3/4 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 w-1/2 h-4 rounded"></div>
          </div>
        </div>
      )}
      {type === 'text' && (
        <div className="bg-gray-300 w-full h-4 rounded" />
      )}
      {type === 'avatar' && (
        <div className="flex items-center space-x-4">
          <div className="bg-gray-300 w-16 h-16 rounded-full" />
          <div className="bg-gray-300 w-32 h-4 rounded" />
        </div>
      )}
      {type === 'list' && (
        <div>
          <div className="bg-gray-300 w-3/4 h-4 rounded mb-2" />
          <div className="bg-gray-300 w-2/3 h-4 rounded" />
        </div>
      )}
    </div>
  ));

  return <>{skeletons}</>;
};

Skeleton.propTypes = {
  type: PropTypes.oneOf(['product', 'cart', 'text', 'avatar', 'list']),
  className: PropTypes.string,
  count: PropTypes.number,
};

Skeleton.defaultProps = {
  type: 'text',
  className: '',
  count: 1,
};

export default Skeleton;
