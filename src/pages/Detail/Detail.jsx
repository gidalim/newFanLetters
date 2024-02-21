import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/commons/buttons/Button";
import CommentModal from "../../components/units/detailComponent/CommentModal";
import { useSelector, useDispatch } from "react-redux";
import { deleteLetter, updateLetter } from "../../redux/modules/fanLetterSlice";
import { openModal, closeModal } from "../../redux/modules/modalSlice"
// import MyPage from "../MyPage/MyPage";


function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fanLetters } = useSelector(state => state.fanLetterSlice);
  const { isModalOpen, isDivVisible, editContent } = useSelector(state => state.modalSlice);
  // const loginUserId = useSelector(state => state.authSlice.userId)
  const letter = fanLetters.find(letter => letter.id.toString() === id);

  // const usersMyPage = loginUserId === userId


  const openModalHandler = () => {
    dispatch(openModal({ content: letter.content, isDivVisible: false }));
  };

  const changedHandler = () => {
    if (editContent.trim() === letter.content.trim()) {
      alert('이전과 다른 내용이 없어요..!');
      return;
    }

    const updatedFanLetter = { ...letter, content: editContent };
    dispatch(updateLetter(updatedFanLetter));
    dispatch(closeModal());
    navigate('/');
  }

  const deletedHandler = () => {
    const isConfirmed = window.confirm('정말로 삭제하시겠어요?');

    if (isConfirmed) {
      dispatch(deleteLetter(id));
      navigate('/');
    }
  }

  const goHomeBtn = () => {
    dispatch(closeModal());
    navigate('/');
  }

  return (
    <div>
      <StBtn onClick={goHomeBtn} >집으로</StBtn>
      {letter ? (
        <StBox>
          <StFanLetterBox>
            <StImg>
              <img src={letter.profile} alt={letter.name} />
            </StImg>
            <StFanDetail>
              <span>{letter.name}</span>
              <time dateTime={letter.time}>{new Date(letter.time).toLocaleString()}</time>
            </StFanDetail>
          </StFanLetterBox>
          <StAddress>to.{letter.selectedPage}</StAddress>
          <StModalDiv
            $isVisible={isDivVisible}
          >
            <StP>{letter.content}</StP>
            <Button onClick={deletedHandler} >삭제</Button>
            <Button onClick={openModalHandler} >수정</Button>
          </StModalDiv>
          <CommentModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            changedHandler={changedHandler}
            editContent={editContent}
          />

        </StBox >
      ) : (
        <p>팬레터가 존재하지 않아요!</p>
      )}
    </div>
  )
}

export default Detail

const StBtn = styled.button`

  margin: 15px;
  padding: 6px 12px;
  width: 90px;
  border-radius: 5px;
  border: transparent;
  background-image: linear-gradient(to right, skyblue, #fcb9fc) ;
  color: white;
  line-height: 1;
`

const StModalDiv = styled.div`
  display: ${props => props.$isVisible ? "block" : "none"};
`

const StBox = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #4ba7f2;
  padding: 15px;
`

const StFanLetterBox = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #f3e1edad;
  width: 100%;
  height:150px;
`

const StImg = styled.figure`
  width: 120px;
  height: 120px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`

const StFanDetail = styled.div`
  display: flex;
  gap : 15px;
  flex-direction: column;
  width: 500px;
  height: 50px;
  font-size: 1.6rem;
  
`

const StAddress = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  font-size: 1.6rem;
  margin-top: 0.6rem;
  margin-bottom: 0.4rem;
`

const StP = styled.p`
  word-wrap: break-word;
  width: 850px;
  height: 250px;
  background-color: #f3e1edad;
  border: transparent;
  padding: 5px;
  font-size: 1.3rem;
  border-radius: 10px;
  line-height: 1.7;
`