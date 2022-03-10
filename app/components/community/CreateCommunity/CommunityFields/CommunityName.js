import React from "react";
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import { Checkbox } from '../../../../shared-components/checkbox'
import styled from "styled-components/native";
import { VerticalSpacer } from "../../../../config/theme";
const InputField = require("../../../../shared-components/inputField");

const CommunityName = ({name, setName,setIsPrivate,isPrivate,setPostByAdminOnly,postByAdminOnly }) => {


    return (
        <>
            <InputField
                autoCapitalize="none"
                value={name}
                maxLength={255}
                onChangeText={(name) => {setName(name)}}
                onSubmitEditing={() => { }}
                placeholderText={"COMMUNITY NAME"} />
            <VerticalSpacer height={22} />
            <NormalText bold>Type</NormalText>
            <TypeButtonHolder>
                <TouchableOpacity onPress={()=>setIsPrivate(false)} style={styles.viewItemLeft} >
                    <Image
                        source={!isPrivate?app.images.selectedTick:app.images.unselectedTick}
                        resizeMode="contain"
                        style={styles.viewItemCheck}
                    />
                    <Text style={styles.typeText}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setIsPrivate(true)} style={styles.viewItem} >
                    <Image
                        source={isPrivate?app.images.selectedTick:app.images.unselectedTick}
                        resizeMode="contain"
                        style={styles.viewItemCheck}
                    />
                    <Text style={styles.typeText}>Private</Text>
                </TouchableOpacity>
            </TypeButtonHolder>
            <VerticalSpacer height={10} />
            <TypeButtonHolder>
                <View style={styles.viewCheckText} >
                    <Checkbox
                        title={'Only Admins can create post'}
                        onPress={() => {
                            setPostByAdminOnly(!postByAdminOnly)
                        }}
                        fontSize={14}
                        fontColor={'#10002E'}
                        isSelected={postByAdminOnly} />
                </View>
            </TypeButtonHolder>
        </>
    );
};

export default CommunityName

const styles = StyleSheet.create({
    viewItem: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    viewItemLeft: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    typeText: {
        color: '#030303'
    },
    viewCheckText: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        justifyContent: 'flex-start'
    },
    viewItemCheck: {
        height: 15,
        width: 15,
        marginRight: 5,
        marginLeft: 10
    }

})

export const NormalText = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${(props) => (props.size ? props.size : "14")}px;
  font-weight: ${(props) => (props.bold ? 'bold' : "normal")};
  color: #000000;
  margin-left:10px;
`;

export const TypeButtonHolder = styled.View`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
