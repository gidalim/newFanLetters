import { useState } from 'react';
import styled from 'styled-components'
import Header from '../../components/units/layout/Header';
import CommentCreator from '../../components/units/homeComponent/CommentCreator';
import CommentRenderer from '../../components/units/homeComponent/CommentRenderer';
import { useSelector } from 'react-redux';

function Home() {

  const [selectedBtn, setSelectedBtn] = useState('카리나');
  const { fanLetters } = useSelector(state => state.fanLetterSlice);
  const filteredData = fanLetters.filter(item => item.selectedPage === selectedBtn)

  return (
    <>
      <Header selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} />

      <StBox >
        <CommentCreator />
      </StBox>
      <StMain >
        <StUl>
          <CommentRenderer
            filteredData={filteredData}
          />
        </StUl>
      </StMain >
    </>
  )
}

export default Home

const StMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1100px;
  height: auto;
  color: black;
`
const StBox = styled.form`
  display: flex;
  width: 1100px;
  justify-content: center;
  margin-bottom: 2rem;
`
const StUl = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: #f3e1edad;
  border-radius: 15px;
`

