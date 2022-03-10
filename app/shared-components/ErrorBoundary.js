import React from 'react'
import { SafeAreaView, Text, View } from 'react-native';

export class ErrorBoundary extends React.Component {

    state = {
      error: false,
      errorInfo: {}
    }
  
    static getDerivedStateFromError (error) {
      return { error: true };
    }
  
    componentDidCatch (error, errorInfo) {
        this.setState({
            errorInfo
        })
    }
  
    render () {
  
      if (this.state.error) {
        return (
          <SafeAreaView>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 32 }}>Oops, Something Went Wrong</Text>
                <Text style={{ marginVertical: 10, lineHeight: 23, fontWeight: '500', fontSize: 12}}>
                  {JSON.stringify(this.state.errorInfo)}
                </Text>
            </View>
          </SafeAreaView>
        )
      } else {
        return this.props.children;
      }
    }
}

export default ErrorBoundary;