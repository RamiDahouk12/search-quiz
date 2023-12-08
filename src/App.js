import { useEffect, useState } from 'react';
import { Container, Input } from 'reactstrap';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredText, setFilteredText] = useState({ filteredLines: [], count: 0 });

  const textData = [
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: '2023-05-15' },
    { title: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '2023-05-16' },
    { title: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris', date: '2023-05-17' },
    { title: 'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor', date: '2023-05-18' },
    { title: 'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', date: '2023-05-19' },
    { title: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui', date: '2023-05-20' },
    { title: 'officia deserunt mollit anim id est laborum.', date: '2023-05-21' },
  ];

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const highlightMatchingText = () => {
    if (!searchTerm) {
      return {
        filteredLines: textData,
        count: textData.length,
      };
    }

    const regex = new RegExp(searchTerm, 'gi');

    const matchingLines = textData
      .filter((item) => item.title.match(regex))
      .map((item) => ({
        ...item,
        title: item.title.replace(regex, (match) => <span class="highlight">${match}</span>),
      }));

    return {
      filteredLines: matchingLines,
      count: matchingLines.length,
    };
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { filteredLines, count } = highlightMatchingText();
      setFilteredText({ filteredLines, count });
    }, 800);

    return () => clearInterval(intervalId);
}, [searchTerm]);

  return (
    <Container style={{ margin: '40px' }}>
      <h1>React Search Box</h1>
      <Input
        type="text"
        placeholder="Search text..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div>
        <h2>({filteredText.count}) Posts Were found</h2>
        <div>
          {filteredText.filteredLines ? (
            filteredText.filteredLines.map((item, index) => (
              <div key={index}>
                <p>
                  <span dangerouslySetInnerHTML={{ __html: item.title }} />
                  {item.date && <span> - {item.date}</span>}
                </p>
              </div>
            ))
          ) : (
            <p>No matching lines</p>
          )}
        </div>
      </div>
      <style>
        {`
          .highlight {
            background-color: yellow;
            font-weight: bold;
          }
        `}
      </style>
    </Container>
  );
}

export default App;