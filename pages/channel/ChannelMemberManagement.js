import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Checkbox, Searchbar } from "react-native-paper";
import { buttonColor, deleteButtonColor } from "../../styles/colorScheme"
import { useEffect, useState } from "react";
import getUserByChannelIdApi from "../../api/userApi/getUserByChannelId.api";
import ConfirmAlert from "../ConfirmAlert";
import removeMembersChannelApi from "../../api/channelApi/removeMembersChannel.api";

export default function WspMemberManagement({ route }) {
	const { channelId } = route.params;
	const [users, setUsers] = useState([]);
	const [allUsers, setAllusers] = useState([]);
	const [search, setSearch] = useState("");
	useEffect(
		function() {
			try {
				const findUsers = async () => {
					const response = await getUserByChannelIdApi(channelId);
					const allUsersResponse = response.map(user => (
						{
							id: user.id,
							email: user.email,
							username: user.firstName + user.lastName,
							avatar: user.picture,
							// selected: user.selected ? user.selected : false,
							selected: false,
						}
					))
					setUsers(allUsersResponse);
					setAllusers(allUsersResponse);
				}
				findUsers();
			} catch (error) { }
		},
		[]
	);
	function findUsers() {
		if (search == "") {
			setUsers(allUsers);
			return;
		}
		const searchUsers = users.filter(user => user.email.includes(search))
		setUsers(searchUsers);
	}
	function showAll() {
		setUsers(allUsers);
	}
	async function onPressDelete() {
		try {
			const selectedUserIds = users.filter(user => user.selected == true).map(user => user.id)
			const response =  await removeMembersChannelApi(channelId, selectedUserIds);
			console.log(response);

		} catch {

		}
	}

	return (
		<View style={styles.container}>
			<Searchbar style={styles.searchBar} placeholder="Search " onChangeText={setSearch} />
			<View style={{ flexDirection: 'row-reverse', width: '100%', marginTop: 15 }}>
				<Button {...buttonColor} style={styles.buttonFind} onPress={findUsers}>find</Button>
				<Button {...buttonColor} style={styles.butShowAll} onPress={showAll}>show All</Button>
			</View>
			<View style={{ flex: 6, width: '100%', marginBottom: 10, }}>
				{users.length > 0 ?
					<FlatList
						style={{ borderBottomWidth: 1 }}
						data={users}
						renderItem={({ item, index }) => (
							<User
								id={item.id}
								username={item.username}
								email={item.email}
								avatar={item.avatar}
								setUsers={setUsers}
								users={users}
								index={index}
							/>
						)}
						keyExtractor={(item) => item.id}
					/> : <ActivityIndicator color="black" size="large" style={{ marginTop: 20 }} />}
			</View>
			<Button {...deleteButtonColor} style={styles.buttonDelete}
				onPress={ConfirmAlert({
					title: "Confirm Deletion",
					message: "are you sure want to delete these users",
					OKText: "Delete",
					onPressOK: onPressDelete,
				})}>Delete</Button>
		</View>
	);
}

function User({ id, username, email, avatar, setUsers, users, index }) {
	const [checked, setChecked] = useState(users[index].selected);
	return (
		<View
			style={styles.containerUSer}
		>
			<View style={styles.secondContainer}>
				<Avatar.Image
					size={45}
					source={{
						uri: avatar,
					}}
				/>
				<View style={styles.leftContainer}>
					<Text style={styles.usernameText}>{username}</Text>
					<Text>{email}</Text>
				</View>
				<View style={styles.timeContainer}>
					<Checkbox
						status={checked ? 'checked' : 'unchecked'}
						onPress={() => {
							users[index].selected = !checked;
							setChecked(!checked);
							setUsers(users);
						}} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		padding: 20,
	},
	timeContainer: {
		flex: 1,
		alignItems: "flex-end",
	},
	searchBar: {
		alignSelf: "flex-start",
		backgroundColor: 'white',
		borderWidth: 1,
		borderRadius: 15,
	},
	buttonFind: {
		width: '30%',
		borderRadius: 10,
		alignSelf: 'flex-end',
	},
	butShowAll: {
		width: '30%',
		borderRadius: 10,
		marginRight: 10,
	},
	buttonAdd: {
		width: "30%",
		borderRadius: 10,
		marginBottom: 10,
		marginTop: 10
	},
	buttonDelete: {
		width: "30%",
		borderRadius: 10,
		alignSelf: 'flex-end',
	},
	containerUSer: {
		padding: 13,
	},
	secondContainer: {
		flexDirection: "row",
		width: "100%",
	},
	leftContainer: {
		marginLeft: 10,
	},
	usernameText: {
		fontWeight: "bold",
		fontSize: 18,
	},
})
