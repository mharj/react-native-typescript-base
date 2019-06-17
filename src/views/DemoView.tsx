import React from 'react';
import {WithTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {NavigationRoute, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHome} from '../actions/demoActions';
import {withTranslation} from '../i18n';
import {unWrapEtag} from '../lib/etagTools';
import {IReduxState, RootThunkDispatch} from '../reducers';
import {styles} from '../styles';

interface IProps {
	navigation: NavigationScreenProp<NavigationRoute>;
}

type Props = IProps & IPropsState & ActionList & WithTranslation;

class DemoView extends React.Component<Props> {
	public static navigationOptions = {
		title: 'Demo View',
	};
	public componentDidMount() {
		this.props.getHome();
	}
	public render() {
		const {navigate} = this.props.navigation;
		const {t, todo} = this.props;
		return (
			<View style={styles.container}>
				{todo ? (
					<View>
						<Text>{t('todo:id')}: {todo.id}</Text>
						<Text>{t('todo:user_id')}:{todo.userId}</Text>
						<Text>{t('todo:title')}: {todo.title}</Text>
						<Text>{t('todo:completed')}: {todo.completed ? t('yes') : t('no')}</Text>
					</View>
				) : null}
			</View>
		);
	}
}

const mapStateToProps = (state: IReduxState) => {
	return {
		todo: unWrapEtag(state.demo.todo),
	};
};

type IPropsState = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: RootThunkDispatch) =>
	bindActionCreators(
		{
			getHome,
		},
		dispatch,
	);
type ActionList = ReturnType<typeof mapDispatchToProps>;

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withTranslation()(DemoView));
