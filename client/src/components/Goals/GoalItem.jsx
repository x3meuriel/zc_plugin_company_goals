/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import dislikes from '../../Images/png/dislikes.png';
import ellipsis from '../../Images/png/ellipsis.png';
import likes from '../../Images/png/likes.png';
import views from '../../Images/png/views.png';
import GoalDropDown from './GoalDropDown';
import {
  useStyles,
  GoalTitle,
  GoalTagsContainer,
  GoalTags,
  ProgressBar,
  ProgressRate,
  ProgressDate,
  IconItemContainer,
  IconItemCount,
  MoreOptions,
  ProgressDetailsContainer,
} from './GoalItem.style';
import { useSelector, useDispatch } from 'react-redux';
import { addDisLike, addLike } from '../../redux/likeGoalSlice';
import Menuoption from '../../components/Menuoption/Menuoption';

const GoalItem = ({ goalData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const month = {
    month_names: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };

  const [showDropDown, setDropDown] = useState(false);
  const goalLikes = useSelector((state) => state.likeGoals.likes);
  const goalDislikes = useSelector((state) => state.likeGoals.dislikes);
  const errorMessage = useSelector((state) => state.goals.errorMessage);

  const likeGoal = (e) => {
    e.stopPropagation();
    dispatch(addLike(1));
  };
  const disLikeGoal = (e) => {
    e.stopPropagation();
    dispatch(addDisLike(1));
  };


  

  const Progress = ((goalData.milestone1 + goalData.milestone2 + goalData.milestone3) / 30) * 100;
  const goalStart = new Date(goalData.start_date);
  const goalEnd = new Date(goalData.due_date);
  const startMonth = month.month_names_short[goalStart.getMonth()];
  const startDate = goalStart.getDate();
  const endMonth = month.month_names_short[goalEnd.getMonth()];
  const endDate = goalEnd.getDate();


  return (
    <Container className={classes.root} key={goalData.room_id}>
      <Grid item xs={12} sm={3} className={classes.rightSpacing}>
        <GoalTitle>{goalData.goal_name ? goalData.goal_name : 'No name'}</GoalTitle>
        <GoalTagsContainer>
          <GoalTags>{goalData.category ? goalData.category : 'No category'}</GoalTags>
        </GoalTagsContainer>
      </Grid>

      <Grid item xs={12} sm={6}>
        <ProgressBar variant="determinate" value={Progress ? Progress : 0} />
        <ProgressDetailsContainer>
          <ProgressRate>Progress Rate: {Progress ? Progress : 0}%</ProgressRate>
          <ProgressDate>
            {goalData.start_date && goalData.due_date
              ? `${startMonth} ${startDate} - ${endMonth} ${endDate}`
              : 'No date set'}
          </ProgressDate>
        </ProgressDetailsContainer>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.icons}>
        <IconItemContainer onClick={(ev) => likeGoal(ev)}>
          <img src={likes} alt="likes-icon" className={classes.iconImages} />
          <IconItemCount>{goalLikes}</IconItemCount>
        </IconItemContainer>
        <IconItemContainer onClick={(ev) => disLikeGoal(ev)}>
          <img src={dislikes} alt="dislikes-icon" className={classes.iconImages} />
          <IconItemCount>{goalDislikes}</IconItemCount>
        </IconItemContainer>
      </Grid>

      <MoreOptions
        onClick={(evt) => {
          evt.stopPropagation();
          setDropDown(!showDropDown);
        }}
      >
        <img src={ellipsis} alt="more-options-icon" />
      </MoreOptions>
      {/* <Menuoption show={showDropDown} toggleShowDropDown={() => setDropDown(!showDropDown)} /> */}
      <GoalDropDown show={{ showDropDown, setDropDown }} goalData={goalData} />
    </Container>
  );
};

export default GoalItem;
