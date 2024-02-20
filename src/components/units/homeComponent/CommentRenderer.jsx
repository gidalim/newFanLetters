import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CommentRenderer = ({ filteredData }) => {
  const navigate = useNavigate();
  const getFanLetterId = (item) => {
    navigate(`detail/${item.id}`)
  }

  if (filteredData && filteredData.length > 0) {
    return filteredData.map(item => (
      <StBox key={item.id}
        className='innerBox'
        onClick={() => getFanLetterId(item)}
      >
        <StCommentBox className='StCommentBox'>
          <StImg>
            <img src={item.profile} alt={item.name} />
          </StImg>
          <StProfile>
            <span>{item.name}</span>
            <time dateTime={item.time}>{new Date(item.time).toLocaleString()}</time>
          </StProfile>
        </StCommentBox>
        <StP>{item.content}</StP>
      </StBox >
    ))
  } else {
    return (
      <>
        <div>첫 번째 팬레터를 작성하시겠어요?</div>
      </>
    );

  }
};

export const StCommentBox = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 480px;
  height: 60px;
  margin-bottom: 15px;
`
export const StBox = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1100px;
  height: 120px;
  border: 1px solid #4ba7f2;
  color: black;
  border-radius: 5px;
  padding: 10px;

  &.innerBox {
    display: flex;
    flex-direction: column;
    width: 480px;
    min-height: 100px;
    margin: 15px;

  }
`
export const StP = styled.p`
  width: 380px;
  height: 20px;
  padding: 5px;
  margin-left: 70px;
  border-radius: 5px;
  background-color: #e0cef3;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.4;

`

export const StImg = styled.figure`
  width: 60px;
  height: 60px;
  margin-right: 25px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`

export const StProfile = styled.div`
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: space-around;
`

export default CommentRenderer