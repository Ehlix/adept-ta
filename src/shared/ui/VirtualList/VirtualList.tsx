import { useRef, useState, useEffect } from 'react';
import styles from './VirtualList.module.scss';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderHead?: () => React.ReactNode;
  offsetTop?: number;
  offsetBottom?: number;
  gap?: number;
}

export const VirtualList = <T,>({
  items,
  itemHeight,
  renderItem,
  renderHead,
  offsetTop = 0,
  offsetBottom = 0,
  gap = 0,
}: VirtualListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [listHeight, setListHeight] = useState(
    () => window.innerHeight - offsetTop - offsetBottom
  );

  // Задержка для отрисовки верхних элементов
  const bufferStart = 5;
  const bufferEnd = 5;

  // Обновление высоты при изменении размера окна
  useEffect(() => {
    const updateHeight = () => {
      const newHeight = window.innerHeight - offsetTop - offsetBottom;
      setListHeight(newHeight);
    };

    window.addEventListener('resize', updateHeight);
    updateHeight();

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [offsetTop, offsetBottom]);

  // Полная высота элемента
  const totalItemHeight = itemHeight + gap;

  // Количество видимых элементов
  const visibleCount = Math.ceil(listHeight / totalItemHeight);

  // Обработчик скролла
  const handleScroll = () => {
    if (containerRef.current) {
      setScrollOffset(containerRef.current.scrollTop);
    }
  };

  // Индексы начала и конца видимого списка
  const startIndex = Math.max(
    0,
    Math.floor((scrollOffset - gap) / totalItemHeight) - bufferStart
  );
  const endIndex = Math.min(
    items.length,
    startIndex + visibleCount + bufferEnd
  );

  // Общая высота списка
  const totalHeight = Math.max(0, items.length * totalItemHeight - gap);

  // Видимые элементы
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onScroll={handleScroll}
    >
      {renderHead && (
        <div
          className={styles.header}
          style={{
            height: `${itemHeight}px`,
          }}
        >
          {renderHead()}
        </div>
      )}
      <div
        className={styles.items}
        style={{
          height: `${totalHeight}px`,
        }}
      >
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            className={styles.item}
            style={{
              transform: `translateY(${
                (startIndex + index) * totalItemHeight
              }px)`,
              height: `${itemHeight}px`,
            }}
          >
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
};
