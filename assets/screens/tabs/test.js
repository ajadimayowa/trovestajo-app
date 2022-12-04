<SafeAreaView>
        <View style={styles.container}>
          {/* form section */}
          <View style={[styles.section, styles.topSection]}>
            <View style={styles.topSectionViewsRowOne}>
              <Text>Here is Your Performance So far</Text>
            </View>

            <View style={styles.topSectionViewsRowTwo}>
              <View style={[styles.topSectionViewsRowTwoViews]}>
                <CircleCard>80</CircleCard>
                <Text style={styles.topSectionViews_p}>Clients Registered</Text>
              </View>

              <View style={[styles.topSectionViewsRowTwoViews]}>
                <CircleCard>70%</CircleCard>
                <Text style={styles.topSectionViews_p}>
                  Timely Cash Pick-up
                </Text>
              </View>

              <View style={[styles.topSectionViewsRowTwoViews]}>
                <CircleCard>85%</CircleCard>
                <Text style={styles.topSectionViews_p}>
                  Timely Cash Deposit
                </Text>
              </View>
            </View>
          </View>

          {/* section two*/}
          <View style={[styles.section, styles.section_two]}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 19, fontWeight: "700" }}>
                Agent Record
              </Text>
              <Text>#Tr/Ag/0023</Text>
            </View>
            <Card />
            <MessageCard />
            <View style={[styles.section, { marginTop: "5%" }]}>
              <Text style={{ fontSize: 20 }}>Agent Tola</Text>
              <Text style={{ fontSize: 9 }}>
                What would you like to do today?
              </Text>
              <View
                style={[
                  styles.section,
                  {
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "3%",
                  },
                ]}
              >
                <CardButton externalInnerStyle={{ backgroundColor: "#01065B" }}>
                  Register New Client
                </CardButton>
                <CardButton externalInnerStyle={{ backgroundColor: "#7D1312" }}>
                  Deposit Collected Funds.
                </CardButton>
              </View>
            </View>
          </View>
          {/* section 3 */}
        </View>
      </SafeAreaView>