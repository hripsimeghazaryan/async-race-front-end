import Pagination from '../interfaces/Pagination';
import Button from './Button';

interface PaginationProps {
  pagination: Pagination,
  nextPage: () => void,
  previousPage: () => void
}

function PaginationComp({ pagination, nextPage, previousPage }: PaginationProps) {
  const lowerLimit = 1;

  return (
    <div className="pagination-container">
      <Button
        title="Prev"
        onClick={previousPage}
        className={(pagination.page > lowerLimit) ? '' : 'btn-hidden'}
      />
      <p className="pagintation-txt">
        {pagination.page}
        /
        {Math.ceil(pagination.total / pagination.limit)}
      </p>
      <Button
        title="Next"
        onClick={nextPage}
        className={(pagination.page < Math.ceil(pagination.total / pagination.limit)) ? '' : 'btn-hidden'}
      />
    </div>
  );
}

export default PaginationComp;
