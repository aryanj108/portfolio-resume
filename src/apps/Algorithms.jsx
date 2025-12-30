import React, { useState, useEffect, useRef } from 'react';

const AlgorithmVisualizer = () => {
  const [mode, setMode] = useState('overview'); // 'overview', 'sorting', 'pathfinding'
  const [sortAlgo, setSortAlgo] = useState('bubble');
  const [pathAlgo, setPathAlgo] = useState('bfs');
  const [dataStrategy, setDataStrategy] = useState('random');
  const [dataPoints, setDataPoints] = useState(50);
  const [mazeStrategy, setMazeStrategy] = useState('maze');
  const [gridWidth, setGridWidth] = useState(40);
  const [gridHeight, setGridHeight] = useState(20);
  
  // Sorting state
  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const cancelRef = useRef(false);
  const audioContextRef = useRef(null);
  
  // Pathfinding state
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState({ x: 1, y: 19 });
  const [end, setEnd] = useState({ x: 38, y: 1 });
  const [visited, setVisited] = useState(new Set());
  const [path, setPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Generate random array for sorting
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < dataPoints; i++) {
      if (dataStrategy === 'random') {
        newArray.push(Math.floor(Math.random() * 100) + 10);
      } else if (dataStrategy === 'sorted') {
        newArray.push(i * 2 + 10);
      } else {
        newArray.push((dataPoints - i) * 2 + 10);
      }
    }
    setArray(newArray);
    setComparing([]);
    setSorted([]);
  };

  // Play sound based on array value
  const playSound = (value) => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Map value (10-110) to frequency (200-800 Hz)
      const frequency = 200 + (value - 10) * 6;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'square'; // Retro sound
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.error('Audio error:', error);
    }
  };

  const carveGuaranteedPath = (grid) => {
  let x = start.x;
  let y = start.y;

  while (x !== end.x || y !== end.y) {
    grid[y][x].isWall = false;

    if (Math.random() < 0.5) {
      if (x < end.x) x++;
      else if (x > end.x) x--;
    } else {
      if (y < end.y) y++;
      else if (y > end.y) y--;
    }
  }

  grid[end.y][end.x].isWall = false;
};


  // Generate grid for pathfinding
    const generateGrid = () => {
    const newGrid = [];

    for (let y = 0; y < gridHeight; y++) {
        const row = [];
        for (let x = 0; x < gridWidth; x++) {
        let isWall = false;
        if (mazeStrategy === 'maze' && Math.random() < 0.3) {
            isWall = true;
        }
        row.push({ x, y, isWall });
        }
        newGrid.push(row);
    }

    carveGuaranteedPath(newGrid);

    newGrid[start.y][start.x].isWall = false;
    newGrid[end.y][end.x].isWall = false;

    setGrid(newGrid);
    setVisited(new Set());
    setPath([]);
    };


  useEffect(() => {
    if (mode === 'sorting') {
      generateArray();
    } else if (mode === 'pathfinding') {
      generateGrid();
    }
    // Cancel any running algorithm when mode changes
    cancelRef.current = true;
    setIsRunning(false);
  }, [mode]);

  // Separate effect for regenerating when settings change
  useEffect(() => {
    if (mode === 'sorting') {
      cancelRef.current = true;
      setIsRunning(false);
      generateArray();
    }
  }, [dataPoints, dataStrategy]);

  useEffect(() => {
    if (mode === 'pathfinding') {
      cancelRef.current = true;
      setIsRunning(false);
      generateGrid();
    }
  }, [mazeStrategy, gridWidth, gridHeight]);

  // Bubble Sort Algorithm
  const bubbleSort = async () => {
    cancelRef.current = false;
    setIsRunning(true);
    const arr = [...array];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      if (cancelRef.current) break;
      for (let j = 0; j < n - i - 1; j++) {
        if (cancelRef.current) break;
        setComparing([j, j + 1]);
        playSound(arr[j]);
        await sleep(50);
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          playSound(arr[j]);
        }
      }
      setSorted(prev => [...prev, n - i - 1]);
    }
    if (!cancelRef.current) {
      setSorted(prev => [...prev, 0]);
    }
    setComparing([]);
    setIsRunning(false);
  };

  // Quick Sort Algorithm
  const quickSort = async () => {
    cancelRef.current = false;
    setIsRunning(true);
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    if (!cancelRef.current) {
      setSorted(arr.map((_, i) => i));
    }
    setComparing([]);
    setIsRunning(false);
  };

  const quickSortHelper = async (arr, low, high) => {
    if (cancelRef.current) return;
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    if (cancelRef.current) return low;
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (cancelRef.current) break;
      setComparing([j, high]);
      playSound(arr[j]);
      await sleep(50);
      
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        playSound(arr[i]);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    return i + 1;
  };

  // Merge Sort Algorithm
  const mergeSort = async () => {
    cancelRef.current = false;
    setIsRunning(true);
    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    if (!cancelRef.current) {
      setSorted(arr.map((_, i) => i));
    }
    setComparing([]);
    setIsRunning(false);
  };

  const mergeSortHelper = async (arr, left, right) => {
    if (cancelRef.current) return;
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(arr, left, mid);
      await mergeSortHelper(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const merge = async (arr, left, mid, right) => {
    if (cancelRef.current) return;
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (cancelRef.current) break;
      setComparing([k, mid + 1 + j]);
      playSound(leftArr[i]);
      await sleep(50);
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      setArray([...arr]);
      k++;
    }
    
    while (i < leftArr.length) {
      if (cancelRef.current) break;
      arr[k] = leftArr[i];
      setArray([...arr]);
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      if (cancelRef.current) break;
      arr[k] = rightArr[j];
      setArray([...arr]);
      j++;
      k++;
    }
  };

  // Heap Sort Algorithm
  const heapSort = async () => {
    cancelRef.current = false;
    setIsRunning(true);
    const arr = [...array];
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (cancelRef.current) break;
      await heapify(arr, n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      if (cancelRef.current) break;
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      playSound(arr[0]);
      setSorted(prev => [...prev, i]);
      await heapify(arr, i, 0);
    }
    
    if (!cancelRef.current) {
      setSorted(prev => [...prev, 0]);
    }
    setComparing([]);
    setIsRunning(false);
  };

  const heapify = async (arr, n, i) => {
    if (cancelRef.current) return;
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n) {
      setComparing([i, left]);
      playSound(arr[left]);
      await sleep(50);
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
    
    if (right < n) {
      setComparing([largest, right]);
      playSound(arr[right]);
      await sleep(50);
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
    
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      playSound(arr[i]);
      await heapify(arr, n, largest);
    }
  };

  // Bogo Sort Algorithm (intentionally slow and inefficient)
  const bogoSort = async () => {
    cancelRef.current = false;
    setIsRunning(true);
    const arr = [...array];
    
    while (!isSorted(arr) && !cancelRef.current) {
      // Shuffle array
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setComparing([i, j]);
        playSound(arr[i]);
        setArray([...arr]);
        await sleep(50);
      }
    }
    
    if (!cancelRef.current) {
      setSorted(arr.map((_, i) => i));
    }
    setComparing([]);
    setIsRunning(false);
  };

  const isSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  // Breadth-First Search
  const bfs = async () => {
    cancelRef.current = false;
    setIsRunning(true);
    const queue = [[start.x, start.y, []]];
    const visitedSet = new Set();
    visitedSet.add(`${start.x},${start.y}`);
    
    while (queue.length > 0 && !cancelRef.current) {
      const [x, y, currentPath] = queue.shift();
      
      setVisited(new Set(visitedSet));
      playSound(50 + visitedSet.size / 2); // Sound based on progress
      await sleep(30);
      
      if (x === end.x && y === end.y) {
        setPath(currentPath);
        setIsRunning(false);
        return;
      }
      
      const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        const key = `${nx},${ny}`;
        
        if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight &&
            !grid[ny][nx].isWall && !visitedSet.has(key)) {
          visitedSet.add(key);
          queue.push([nx, ny, [...currentPath, { x: nx, y: ny }]]);
        }
      }
    }
    setIsRunning(false);
  };

  // Depth-First Search
  const dfs = async () => {
    cancelRef.current = false;
    setIsRunning(true);
    const visitedSet = new Set();
    const found = await dfsHelper(start.x, start.y, [], visitedSet);
    setIsRunning(false);
  };

  const dfsHelper = async (x, y, currentPath, visitedSet) => {
    if (cancelRef.current) return false;
    const key = `${x},${y}`;
    if (visitedSet.has(key)) return false;
    
    visitedSet.add(key);
    setVisited(new Set(visitedSet));
    playSound(40 + visitedSet.size / 3); // Sound based on progress
    await sleep(30);
    
    if (x === end.x && y === end.y) {
      setPath(currentPath);
      return true;
    }
    
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      
      if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight &&
          !grid[ny][nx].isWall) {
        if (await dfsHelper(nx, ny, [...currentPath, { x: nx, y: ny }], visitedSet)) {
          return true;
        }
      }
    }
    return false;
  };

    const handleDataPointsChange = (val) => {
    val = parseInt(val) || 1;
    if (val < 1) val = 1;
    if (val > 2048) val = 2048;
    setDataPoints(val);
    };

    const handleGridWidthChange = (val) => {
    val = parseInt(val) || 5;
    if (val < 5) val = 5;
    if (val > 100) val = 100;
    setGridWidth(val);
    };

    const handleGridHeightChange = (val) => {
    val = parseInt(val) || 5;
    if (val < 5) val = 5;
    if (val > 100) val = 100;
    setGridHeight(val);
    };

  const handleStart = () => {
    if (mode === 'sorting') {
      if (sortAlgo === 'bubble') bubbleSort();
      else if (sortAlgo === 'quick') quickSort();
      else if (sortAlgo === 'merge') mergeSort();
      else if (sortAlgo === 'heap') heapSort();
      else if (sortAlgo === 'bogo') bogoSort();
    } else if (mode === 'pathfinding') {
      if (pathAlgo === 'bfs') bfs();
      else if (pathAlgo === 'dfs') dfs();
    }
  };

  const handleStop = () => {
    cancelRef.current = true;
    setIsRunning(false);
    setComparing([]);
  };

  const handleGridMouseDown = (x, y) => {
    if (isRunning) return;
    setIsDrawing(true);
    toggleWall(x, y);
  };

  const handleGridMouseEnter = (x, y) => {
    if (isDrawing && !isRunning) {
      toggleWall(x, y);
    }
  };

  const toggleWall = (x, y) => {
    if ((x === start.x && y === start.y) || (x === end.x && y === end.y)) return;
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    newGrid[y][x].isWall = !newGrid[y][x].isWall;
    setGrid(newGrid);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div style={styles.container}>


      {mode === 'overview' && (
        <div style={styles.content}>
          <h2 style={styles.heading}>Sorting</h2>
          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={() => { setSortAlgo('bubble'); setMode('sorting'); }}>
              Bubble sort
            </button>
            <button style={styles.button} onClick={() => { setSortAlgo('bogo'); setMode('sorting'); }}>
              Bogo sort
            </button>
            <button style={styles.button} onClick={() => { setSortAlgo('merge'); setMode('sorting'); }}>
              Merge sort
            </button>
            <button style={styles.button} onClick={() => { setSortAlgo('quick'); setMode('sorting'); }}>
              Quick sort
            </button>
            <button style={styles.button} onClick={() => { setSortAlgo('heap'); setMode('sorting'); }}>
              Heap sort
            </button>
          </div>

          <div style={styles.section}>
            <h3 style={styles.subheading}>Sorting options</h3>
            <div style={styles.option}>
              <label style={styles.label}>Data generation strategy</label>
              <select style={styles.select} value={dataStrategy} onChange={(e) => setDataStrategy(e.target.value)}>
                <option value="random">Randomly distributed</option>
                <option value="sorted">Sorted left to right</option>
                <option value="reverse">Sorted right to left</option>
              </select>
            </div>
            <div style={styles.option}>
              <label style={styles.label}>Data generation points</label>
              <input 
                type="number" 
                style={styles.input} 
                value={dataPoints} 
                onChange={(e) => handleDataPointsChange(parseInt(e.target.value))}
              />
            </div>
            <div style={styles.option}>
              <label style={styles.label}>
                <input 
                  type="checkbox" 
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  style={styles.checkbox}
                />
                Enable sound
              </label>
            </div>
          </div>

          <h2 style={styles.heading}>Path finding</h2>
          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={() => { setPathAlgo('dfs'); setMode('pathfinding'); }}>
              Depth-first search
            </button>
            <button style={styles.button} onClick={() => { setPathAlgo('bfs'); setMode('pathfinding'); }}>
              Breadth-first search
            </button>
          </div>

          <div style={styles.section}>
            <div style={styles.option}>
              <label style={styles.label}>Data generation strategy</label>
              <select style={styles.select} value={mazeStrategy} onChange={(e) => setMazeStrategy(e.target.value)}>
                <option value="maze">Maze</option>
                <option value="open">Open field</option>
                <option value="pipes">Pipes</option>
              </select>
            </div>
            <div style={styles.option}>
              <label style={styles.label}>Path finding area width</label>
              <input 
                type="number" 
                style={styles.input} 
                value={gridWidth} 
                onChange={(e) => handleGridWidthChange(parseInt(e.target.value))}
              />
            </div>
            <div style={styles.option}>
              <label style={styles.label}>Path finding area height</label>
              <input 
                type="number" 
                style={styles.input} 
                value={gridHeight} 
                onChange={(e) => handleGridHeightChange(parseInt(e.target.value))}
              />
            </div>
            <div style={styles.option}>
              <label style={styles.label}>
                <input 
                  type="checkbox" 
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  style={styles.checkbox}
                />
                Enable sound
              </label>
            </div>
          </div>
        </div>
      )}

      {mode === 'sorting' && (
        <div style={styles.content}>
          <div style={styles.visualization}>
            {array.map((value, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.bar,
                  height: `${value}%`,
                  backgroundColor: sorted.includes(idx) ? '#00ff00' : 
                                 comparing.includes(idx) ? '#ff0000' : '#ffffff'
                }}
              />
            ))}
          </div>
          
          <div style={styles.controls}>
            <h3 style={styles.controlHeading}>
              {sortAlgo === 'bubble' ? 'Bubble sort' : 
               sortAlgo === 'quick' ? 'Quick sort' : 
               sortAlgo === 'merge' ? 'Merge sort' : 
               sortAlgo === 'heap' ? 'Heap sort' : 'Bogo sort'}
            </h3>
            <button style={styles.button} onClick={handleStart} disabled={isRunning}>
              Start
            </button>
            <button style={styles.button} onClick={handleStop} disabled={!isRunning}>
              Stop
            </button>
            <button style={styles.button} onClick={generateArray} disabled={isRunning}>
              Regenerate
            </button>
            <div style={styles.option}>
              <label style={styles.label}>Data generation strategy</label>
              <select style={styles.select} value={dataStrategy} onChange={(e) => setDataStrategy(e.target.value)}>
                <option value="random">Randomly distributed</option>
                <option value="sorted">Sorted left to right</option>
                <option value="reverse">Sorted right to left</option>
              </select>
            </div>
            <div style={styles.option}>
              <label style={styles.label}>Data generation points</label>
              <input 
                type="number" 
                style={styles.input} 
                value={dataPoints} 
                onChange={(e) => setDataPoints(parseInt(e.target.value))}
              />
            </div>
            <button style={styles.link} onClick={() => setMode('overview')}>
              Return to overview
            </button>
          </div>
        </div>
      )}

      {mode === 'pathfinding' && (
        <div style={styles.content}>
          <div 
            style={styles.grid}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
          >
            {grid.map((row, y) => (
              <div key={y} style={styles.gridRow}>
                {row.map((cell, x) => {
                  const isStart = x === start.x && y === start.y;
                  const isEnd = x === end.x && y === end.y;
                  const isVisited = visited.has(`${x},${y}`);
                  const isPath = path.some(p => p.x === x && p.y === y);
                  
                  return (
                    <div
                      key={x}
                      style={{
                        ...styles.cell,
                        backgroundColor: isStart ? '#00ff00' : 
                                       isEnd ? '#ff0000' : 
                                       isPath ? '#ffff00' :
                                       isVisited ? '#aaaaaa' :
                                       cell.isWall ? '#000000' : '#ffffff'
                      }}
                      onMouseDown={() => handleGridMouseDown(x, y)}
                      onMouseEnter={() => handleGridMouseEnter(x, y)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          
          <div style={styles.controls}>
            <h3 style={styles.controlHeading}>
              {pathAlgo === 'bfs' ? 'Breadth-first search' : 
               pathAlgo === 'dfs' ? 'Depth-first search' : 'A* search'}
            </h3>
            <button style={styles.button} onClick={handleStart} disabled={isRunning}>
              Start
            </button>
            <button style={styles.button} onClick={handleStop} disabled={!isRunning}>
              Stop
            </button>
            <button style={styles.button} onClick={generateGrid} disabled={isRunning}>
              Regenerate
            </button>
            <div style={styles.option}>
              <label style={styles.label}>Data generation strategy</label>
              <select style={styles.select} value={mazeStrategy} onChange={(e) => setMazeStrategy(e.target.value)}>
                <option value="maze">Maze</option>
                <option value="open">Open field</option>
                <option value="pipes">Pipes</option>
              </select>
            </div>
            <div style={styles.option}>
              <label style={styles.label}>Path finding area width</label>
              <input 
                type="number" 
                style={styles.input} 
                value={gridWidth} 
                onChange={(e) => setGridWidth(parseInt(e.target.value))}
              />
            </div>
            <div style={styles.option}>
              <label style={styles.label}>Path finding area height</label>
              <input 
                type="number" 
                style={styles.input} 
                value={gridHeight} 
                onChange={(e) => setGridHeight(parseInt(e.target.value))}
              />
            </div>
            <button style={styles.link} onClick={() => setMode('overview')}>
              Return to overview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#c0c0c0',
    fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
    fontSize: '11px',
    display: 'flex',
    flexDirection: 'column',
  },
  titleBar: {
    background: 'linear-gradient(to right, #000080, #1084d0)',
    color: 'white',
    padding: '3px 5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: '11px',
  },
  windowControls: {
    display: 'flex',
    gap: '2px',
  },
  controlBtn: {
    width: '16px',
    height: '14px',
    backgroundColor: '#c0c0c0',
    border: 'outset 1px',
    fontSize: '9px',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    padding: '10px',
    overflow: 'auto',
    backgroundColor: '#ffffffff',
  },
  heading: {
    fontSize: '25px',
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0px',
    marginBottom: '15px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '4px 12px',
    backgroundColor: '#ebebebff',
    border: 'outset 2px',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
  },
  section: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#ffffff',
  },
  option: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  label: {
    minWidth: '180px',
  },
  select: {
    padding: '2px',
    border: 'inset 2px',
    backgroundColor: '#ffffff',
    fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
    fontSize: '11px',
  },
  input: {
    width: '60px',
    padding: '2px',
    border: 'inset 2px',
    backgroundColor: '#ffffff',
    fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
    fontSize: '11px',
  },
  checkbox: {
    marginRight: '5px',
  },
  visualization: {
    height: '300px',
    backgroundColor: '#000000',
    border: 'inset 2px',
    display: 'flex',
    alignItems: 'flex-end',
    gap: '1px',
    padding: '5px',
    marginBottom: '10px',
  },
  bar: {
    flex: 1,
    minWidth: '2px',
    transition: 'background-color 0.1s',
  },
  grid: {
    backgroundColor: '#000000',
    border: 'inset 2px',
    display: 'inline-block',
    marginBottom: '10px',
    cursor: 'crosshair',
  },
  gridRow: {
    display: 'flex',
  },
  cell: {
    width: '12px',
    height: '12px',
    border: '1px solid #333',
  },
  controls: {
    padding: '10px',
    backgroundColor: '#e7e4e4ff',
  },
  controlHeading: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#0000ff',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '11px',
    padding: '5px 0',
    fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
  },
};

export default AlgorithmVisualizer;